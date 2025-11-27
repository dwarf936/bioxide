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

    debug && console.log('ncdoe === ', ncode, 'code === ', code)

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
    it('design/el.tpl - 测试元素渲染和属性绑定', () => {
        const Fn = build('el')
        render(createElement(Fn, {
            className: 'test',
            a: 1,
            b: 2
        }))
        
        // 测试固定类名
        expect(screen.getByText(/a/))
            .toHaveClass('my-p')
        
        // 测试动态类名
        expect(screen.getByText(/b/))
            .toHaveClass('test')
        
        // 测试展开属性
        const cElement = screen.getByText(/c/)
        expect(cElement).toHaveClass('test')
        expect(cElement).toHaveAttribute('a', '1')
        expect(cElement).toHaveAttribute('b', '2')
        
        // 测试动态类名（另一种写法）
        expect(screen.getByText(/d/))
            .toHaveClass('test')
        
        // 测试动态属性值
        expect(screen.getByText(/e/))
            .toHaveAttribute('data-abc', '3') // 1 + 2 = 3
    })

    it('design/if.tpl - 测试条件渲染', () => {
        const Fn = build('if')
        
        // 测试条件为true的情况
        render(createElement(Fn, {
            type: 'a'
        }))
        expect(screen.getByText(/I am a/)).toBeInTheDocument()
        expect(screen.queryByText(/I am b/)).not.toBeInTheDocument()
        expect(screen.queryByText(/I am c/)).not.toBeInTheDocument()
        
        // 测试else if条件
        render(createElement(Fn, {
            type: 'b',
            msg: 'world'
        }))
        expect(screen.getByText(/I am b/)).toBeInTheDocument()
        expect(screen.getByText(/hello world/)).toBeInTheDocument()
        expect(screen.queryByText(/I am a/)).not.toBeInTheDocument()
        
        // 测试else条件
        render(createElement(Fn, {
            type: 'c',
            msg: 'everyone'
        }))
        expect(screen.getByText(/I am c/)).toBeInTheDocument()
        expect(screen.getByText(/hello everyone/)).toBeInTheDocument()
        expect(screen.queryByText(/I am a/)).not.toBeInTheDocument()
        expect(screen.queryByText(/I am b/)).not.toBeInTheDocument()
    })

    it('design/graph.tpl - 测试图组件渲染', () => {
        const Fn = build('graph')
        render(createElement(Fn))
        // 这个模板主要测试系统在没有默认状态时的行为
        // 由于模板中使用了state.obj.msg但没有初始化，可能会导致错误
        // 这里我们只是测试它能正常渲染而不崩溃
    })

    it('design/initState.tpl - 测试初始化状态和异步更新', async () => {
        const Fn = build('initState')
        
        // 使用act包裹异步状态更新
        await act(async () => {
            render(createElement(Fn))
        })

        // 初始状态应该是loading为false
        expect(screen.getByText('i am not loading'))
            .toBeInTheDocument()
        expect(screen.queryByText('i am loading')).not.toBeInTheDocument()
        
        // 等待状态更新
        await new Promise(resolve => setTimeout(resolve, 50))
        
        // 使用act包裹状态更新后的断言
        await act(async () => {
            // 状态应该更新为loading为true
            expect(screen.getByText('i am loading'))
                .toBeInTheDocument()
            expect(screen.queryByText('i am not loading')).not.toBeInTheDocument()
        })
    })

    it('design/component.tpl - 测试组件导入和使用', () => {
        const Fn = build('component')
        render(createElement(Fn))

        // 测试Ant Design Button组件是否正确渲染
        const buttonElement = screen.getByText('hello world').parentElement
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveClass('ant-btn')
    })

    it('design/child-component.tpl - 测试子组件注册和属性传递', () => {
        const Fn = build('child-component')
        render(createElement(Fn))

        // 测试子组件是否正确接收和应用属性
        expect(screen.getByText(/a/)).toHaveClass('my-p')
        expect(screen.getByText(/b/)).toHaveClass('test')
        expect(screen.getByText(/c/)).toHaveClass('test')
        expect(screen.getByText(/c/)).toHaveAttribute('a', '1')
        expect(screen.getByText(/d/)).toHaveClass('test')
        expect(screen.getByText(/e/)).toHaveAttribute('data-abc', '3')
    })

    it('design/each.tpl - 测试列表渲染', () => {
        const Fn = build('each')
        const testItems = [
            { name: 'Apples', qty: 5 },
            { name: 'Bananas', qty: 3 },
            { name: 'Oranges', qty: 2 }
        ]
        
        render(createElement(Fn, { items: testItems }))
        
        // 测试标题是否渲染
        expect(screen.getByText('Shopping list')).toBeInTheDocument()
        
        // 测试列表项是否正确渲染
        const listItems = screen.getAllByRole('listitem')
        expect(listItems.length).toBe(3)
        
        // 测试列表项内容
        expect(listItems[0]).toHaveTextContent('0 Apples x 5')
        expect(listItems[1]).toHaveTextContent('1 Bananas x 3')
        expect(listItems[2]).toHaveTextContent('2 Oranges x 2')
    })

    it('design/each.tpl - 测试空列表情况', () => {
        const Fn = build('each')
        
        render(createElement(Fn, { items: [] }))
        
        // 测试标题是否渲染
        expect(screen.getByText('Shopping list')).toBeInTheDocument()
        
        // 测试列表是否为空
        const listItems = screen.queryAllByRole('listitem')
        expect(listItems.length).toBe(0)
    })

    it('design/event.tpl - 测试事件处理', () => {
        const Fn = build('event')
        
        render(createElement(Fn))
        
        // 测试组件是否渲染
        const pElement = screen.getByRole('paragraph')
        expect(pElement).toBeInTheDocument()
    })

    it('design/register.tpl - 测试事件注册', () => {
        const Fn = build('register')
        
        render(createElement(Fn))
        
        // 测试组件是否渲染
        const pElement = screen.getByRole('paragraph')
        expect(pElement).toBeInTheDocument()
    })
})