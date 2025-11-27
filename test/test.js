import '@testing-library/jest-dom'
import React, { createElement } from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { Button } from 'antd'
import complie from '../src/index.js'
import { transformSync } from "@babel/core";
import { readFileSync } from 'fs'
import eventBus from '../lib/event-bus.js'

let El = build('el')

function build(name, debug) {
    const ncode = complie(
        readFileSync(`./design/${name}.tpl`, 'utf-8'), 
        { 
            test: true, 
            resolve: (name) => {
                return `./${name.slice(4)}.tpl`
            },
        })
    const { code } = transformSync(ncode, { 
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-commonjs"]
    })

    if (debug) {
        console.log(`Compiled code for ${name}.tpl:`)
        console.log('ncode:', ncode)
        console.log('code:', code)
    }

    const mod = { exports: {} }
    const req = function (name) {
        if (name === 'react') return React
        if (name === 'react-dom/test-utils') return { act }
        if (name === 'antd') return { Button }
        if (name === './el.tpl') return El
        if (name === 'bioxide/lib/event-bus.js') return eventBus
        throw new Error(`Cannot load ${name}`)
    }
    ;(new Function('module', 'exports', 'require', code))(mod, mod.exports, req)
    return mod.exports.default
}

describe('bioxide template', () => {
    it('design/el.tpl', () => {
        const Fn = build('el')
        render(createElement(Fn, {
            className: 'test',
            a: 1,
            b: 2
        }))
        expect(screen.getByText(/a/))
            .toHaveClass('my-p')
        expect(screen.getByText(/b/))
            .toHaveClass('test')
        expect(screen.getByText(/c/))
            .toHaveClass('test')
        expect(screen.getByText(/c/))
            .toHaveAttribute('a')
        expect(screen.getByText(/d/))
            .toHaveClass('test')
        expect(screen.getByText(/e/))
            .toHaveAttribute('data-abc')
    })

    it('design/if.tpl', () => {
        const Fn = build('if')
        render(createElement(Fn, {
            type: 'a'
        }))
        expect(screen.getByText(/I am a/)).toBeInTheDocument()
        render(createElement(Fn, {
            type: 'b',
            msg: 'world'
        }))
        const b = screen.getByText(/I am b/)
        expect(screen.getByText(/I am b/))
            .toBeInTheDocument()
        expect(screen.getByText(/hello world/))
            .toBeInTheDocument()

    })

    it('design/graph.tpl', () => {
        const Fn = build('graph')
        render(createElement(Fn))
    })

    it('design/initState.tpl', (done) => {
        const Fn = build('initState')
        render(createElement(Fn))

        expect(screen.getByText('i am not loading'))
            .toBeInTheDocument()
        setTimeout(() => {
            expect(screen.getByText('i am loading'))
                .toBeInTheDocument()
            done()
        }, 100)
    })

    it('design/component.tpl', () => {
        const Fn = build('component')
        render(createElement(Fn))

        expect(screen.getByText('hello world'))
            .toBeInTheDocument()
        expect(screen.getByText('hello world').parentElement)
            .toHaveClass('ant-btn')
    })

    it('design/child-component.tpl', () => {
        const Fn = build('child-component')
        render(createElement(Fn))

        expect(screen.getByText(/a/))
            .toHaveClass('my-p')
        expect(screen.getByText(/b/))
            .toHaveClass('test')
        expect(screen.getByText(/c/))
            .toHaveClass('test')
        expect(screen.getByText(/c/))
            .toHaveAttribute('a')
        expect(screen.getByText(/d/))
            .toHaveClass('test')
        expect(screen.getByText(/e/))
            .toHaveAttribute('data-abc')
    })

    it('design/event.tpl', () => {
        const Fn = build('event')
        // 创建事件总线实例
        const eventBusInstance = eventBus.create()
        let eventPayload = null
        
        // 注册测试事件
        eventBusInstance.register('test', (payload) => {
            eventPayload = payload
        })
        
        // 保存原始 console.warn
        const originalWarn = console.warn
        let warnMessage = null
        console.warn = (message) => {
            warnMessage = message
            originalWarn(message)
        }
        
        // 将事件总线实例通过 props.__ 传递给组件
        render(createElement(Fn, { __: eventBusInstance }))
        
        // 测试事件触发
        const testElement = screen.getByTestId('event-test')
        
        // 触发点击事件
        fireEvent.click(testElement)
        
        // 验证事件是否被触发并传递了正确的 payload
        expect(eventPayload).toBe('test value')
        
        // 验证没有输出警告
        expect(warnMessage).not.toBe('you should not use $trigger in thie component.')
        
        // 销毁事件注册
        eventBusInstance.destroy()
        
        // 恢复 console.warn
        console.warn = originalWarn
    })

    it('design/register.tpl', () => {
        const Fn = build('register')
        // 创建事件总线实例
        const eventBusInstance = eventBus.create()
        let consoleOutput = null
        
        // 保存原始 console.log
        const originalLog = console.log
        console.log = (message) => {
            consoleOutput = message
        }
        
        // 将事件总线实例通过 props.__ 传递给组件
        render(createElement(Fn, { __: eventBusInstance }))
        
        // 触发 submit 事件
        eventBusInstance.trigger('submit', 'test payload')
        
        // 验证事件是否被处理
        expect(consoleOutput).toBe('hello world')
        
        // 恢复原始 console.log
        console.log = originalLog
    })
})