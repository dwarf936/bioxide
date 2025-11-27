import Fragment from './nodes/fragment.js'
import { walk } from 'svelte/compiler'
import { generate } from 'astring'
import Code from './nodes/code.js'


export default class Component {
    constructor(code, ast, options) {
        this.code = code
        this.ast = ast
        this.options = options
        this.jsOptions = null
        this.walk_js()
        this.fragment = new Fragment(this, ast.html, code)
    }

    walk_js() {
        const script = this.ast.instance
        if (!script) return
        const jsOptions = {}
        let exportDefault
        walk(script, {
            enter(node, parent) {
                if (node.type === 'ExportDefaultDeclaration') {
                    parent.body.splice(parent.body.indexOf(node), 1)
                    exportDefault = node
                    this.skip()
                }
            }
        })

        walk(exportDefault, {
            enter(node) {
                if (node.type === 'Property') {
                    // console.log(node)
                    switch (node.key.name) {
                        case 'defaultState':
                        case 'initState':
                        case 'reducer':
                            jsOptions[node.key.name] = node.value
                            break
                        case 'register':
                            jsOptions.register = {}
                            if (node.value && node.value.type === 'ObjectExpression') {
                                node.value.properties.forEach(node => {
                                    if (node.type === 'Property') {
                                        jsOptions.register[node.key.name] = node.value
                                    }
                                }) 
                            }
                            break
                    }                    
                    this.skip()
                }
            }
        })

        if (exportDefault) {
            // set options
            this.jsOptions = jsOptions
        }
    }

    generate() {
        this.fragment.generate()
        const code = new Code
        const hasEventBus = this.fragment.hasEventBus
        const { dev } = this.options

        console.log(this.ast.css)

        code.addLine(`import React from 'react'`)
        if (hasEventBus) {
            if (dev) {
                code.addLine(`import eventBus from '../../lib/event-bus.js'`)
            } else {
                code.addLine(`import eventBus from 'bioxide/lib/event-bus.js'`)
            }
        }
        // class build
        if (this.jsOptions) {
            const { defaultState, initState, reducer, register } = this.jsOptions
            code.addBlock(`${generate(this.ast.instance.content)}`)
            code.addBlock(this.fragment.codes[0].map(code => code.toString()).join('\n'))
            if (reducer) {
                // TODO: add reducer helper
            }

            code.addLine(`export default class Component extends React.Component {`)
            code.indent++
            code.addLine(`constructor(props) {`)
            code.indent++
            code.addLine(`super(props)`)
            if (defaultState) {
                code.addBlock(`this.state = ${generate(defaultState)}`)
            } else {
                code.addBlock(`this.state = ${this.fragment.graph.build('state')}`)
            }
            code.addLine(`this.props = props`)
            code.addLine(`this.__ = props.__${hasEventBus ? ' || eventBus.create()' : ''}`)
            // 定义 $trigger 函数并绑定到类的实例 this 上
            if (hasEventBus) {
                code.addLine(`this.$trigger = this.__.trigger.bind(this.__)`)
            } else {
                code.addLine(`this.$trigger = function () { console.warn('you should not use $trigger in thie component.') }`)
            }
            code.indent--
            code.addLine(`}`)
            code.addLine(`componentDidMount() {`)
            if (initState) {
                code.indent++
                code.addBlock(`(${generate(initState)})(this.props).then(v => {this.setState(v)})`)
                code.indent--
            }
            if (register) {
                code.indent++
                Object.keys(register).forEach(key => {
                    code.addBlock(`this.__.register('${key}', (payload) => { const { state, setState } = this; (${generate(register[key])})(payload, { state, setState: setState.bind(this) })})`)                    
                })
                code.indent--
            }
            code.addLine(`}`)
            if (register) {
                code.addLine('componentWillUnmount() {')
                code.indent++
                code.addLine(`this.__.destroy()`)
                code.indent--
                code.addLine('}')
            }

            code.addLine(`render() {`)
            code.indent++
            code.addLine(`const { state, props, __ } = this`)
            code.addLine(`const setState = this.setState.bind(this)`)
            code.addLine(`const $trigger = this.$trigger`)
            // 修改模板中的事件处理函数，将 xxx(state) 改为 this.xxx(this.state)
            let templateContent = this.fragment.codes[1].toString(1)
            const eventHandlers = templateContent.match(/onClick=\{\(\) => (\w+)\(state\)\}/g)
            if (eventHandlers) {
                eventHandlers.forEach(handler => {
                    const funcName = handler.match(/onClick=\{\(\) => (\w+)\(state\)\}/)[1]
                    const modifiedHandler = `onClick={() => this.${funcName}(this.state)}`
                    templateContent = templateContent.replace(handler, modifiedHandler)
                })
            }
            code.addBlock(templateContent)
            code.indent--
            code.addLine(`}`)
            code.indent--
            code.addLine(`}`)

            // 将 script 标签中定义的函数移到类的 prototype 中
            const scriptContent = generate(this.ast.instance.content)
            const functions = scriptContent.match(/function\s+(\w+)\s*\((.*?)\)\s*\{([^}]+)\}/g)
            if (functions) {
                functions.forEach(func => {
                    const funcName = func.match(/function\s+(\w+)\s*\(/)[1]
                    const funcParams = func.match(/function\s+\w+\s*\((.*?)\)/)[1]
                    const funcBody = func.match(/function\s+\w+\s*\(.*?\)\s*\{([^}]+)\}/)[1]
                    // 将 $trigger 替换为 this.$trigger
                    const modifiedFuncBody = funcBody.replace(/\$trigger/g, 'this.$trigger')
                    // 将 state 替换为 this.state
                    const modifiedFuncBody2 = modifiedFuncBody.replace(/state\./g, 'this.state.')
                    // 将 setState 替换为 this.setState
                    const modifiedFuncBody3 = modifiedFuncBody2.replace(/setState\(/g, 'this.setState(')
                    // 添加到类的 prototype 中
                    code.addLine(`Component.prototype.${funcName} = function (${funcParams}) {${modifiedFuncBody3}}`)
                })
            }
        } else {
            const stateGraph = this.fragment.graph.build('state')
            if (this.ast.instance && this.ast.instance.content) {
                code.addBlock(`${generate(this.ast.instance.content)}`)
            }
            code.addBlock(this.fragment.codes[0].map(code => code.toString()).join('\n'))
            code.addLine('export default (props) => {')
            code.indent++
            if (stateGraph !== '{\n}') {
                code.addBlock(`console.warn(\`component state is undefined, but template use it\`, 'state graph === ', ${stateGraph})`)
            }
            code.addLine(`const __ = props.__${hasEventBus ? ' || eventBus.create()' : ''}`)
            code.addLine(`const $trigger = __ ? __.trigger : function () { console.warn('you should not use $trigger in thie component.') }`)
            code.addBlock(`${this.fragment.codes[1].toString(1)}`)
            code.indent--
            code.addLine('}')
        }        

        return code.toString()
    }
}