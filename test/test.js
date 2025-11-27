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
        // 测试事件触发功能
        const Fn = build('event', true)
        
        // 创建模拟的事件总线实例
        let testEventPayload = null
        const mockEventBus = {
            trigger: (eventName, payload) => {
                if (eventName === 'test') {
                    testEventPayload = payload
                }
            }
        }
        
        // 渲染组件并传递模拟的事件总线实例
        render(createElement(Fn, { __: mockEventBus }))
        
        // 模拟点击事件，触发xxx函数
        const eventElement = screen.getByTestId('event-test')
        fireEvent.click(eventElement)
        
        // 验证事件是否被触发并传递了正确的payload
        expect(testEventPayload).toBe('test value')
    })

    it('design/register.tpl', () => {
        // 测试事件注册功能
        const Fn = build('register')
        
        // 创建事件总线实例
        const eventInstance = eventBus.create()
        
        // 渲染组件并传递事件总线实例
        render(createElement(Fn, { __: eventInstance }))
        
        // 模拟submit事件触发
        let consoleLogCalled = false
        const originalConsoleLog = console.log
        console.log = () => {
            consoleLogCalled = true
        }
        
        // 触发submit事件
        eventInstance.trigger('submit', { test: 'data' })
        
        // 验证事件处理函数是否被调用
        expect(consoleLogCalled).toBe(true)
        
        // 恢复原始console.log
        console.log = originalConsoleLog
        
        // 清理事件总线
        eventInstance.destroy()
    })
})