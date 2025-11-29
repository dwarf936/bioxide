import '@testing-library/jest-dom'
import React, { createElement } from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { Button } from 'antd'
import complie from '../src/index.js'
import { transformSync } from "@babel/core";
import { readFileSync } from 'fs'
import eventBus from '../lib/event-bus.js'
import { SourceMapConsumer } from 'source-map'

function build(name, debug = true) {
    const ncode = complie(
        readFileSync(`./design/${name}.tpl`, 'utf-8'), 
        { 
            test: true, 
            resolve: (name) => {
                return `./${name.slice(4)}.tpl`
            },
            sourceMap: true,
            sourceFile: `${name}.tpl`
        })
    const { code, map } = transformSync(ncode.code, {
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
        sourceMaps: true
    })

    debug && console.log('ncode === ', JSON.stringify(ncode, null, 2))

    const mod = { exports: {} }
    const req = function (name) {
        if (name === 'react') return React
        if (name === 'react-dom/test-utils') return { act }
        if (name === 'antd') return { Button }
        if (name === './el.tpl') return build('el').Component
        if (name === 'bioxide/lib/event-bus.js') return eventBus
        throw new Error(`Cannot load ${name}`)
    }
    ;(new Function('module', 'exports', 'require', code))(mod, mod.exports, req)
    return { Component: mod.exports.default, sourceMap: ncode.sourceMap || map, map: map }
}

describe('bioxide template', () => {
    it('design/el.tpl', async () => {
        const { Component: Fn, sourceMap, map } = build('el', true)
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
            .toHaveAttribute('data-abc', '3')
            
        // 验证SourceMap是否正确映射到tpl文件
        if (map) {
            console.log('map === ', JSON.stringify(map, null, 2));
            const smc = await new SourceMapConsumer(map);
            const pos1 = smc.originalPositionFor({ line: 26, column: 6 });
            expect(pos1.line).toBe(1);
            expect(pos1.source).toBe('el.tpl');
            const pos2 = smc.originalPositionFor({ line: 27, column: 6 });
            expect(pos2.line).toBe(2);
            expect(pos2.source).toBe('el.tpl');
            smc.destroy();
        }
    })

    it('design/if.tpl', () => {
        const { Component: Fn, sourceMap } = build('if')
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
        const { Component: Fn, sourceMap } = build('graph')
        render(createElement(Fn))
    })

    it('design/initState.tpl', (done) => {
        const { Component: Fn, sourceMap } = build('initState')
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
        const { Component: Fn, sourceMap } = build('component')
        render(createElement(Fn))

        expect(screen.getByText('hello world'))
            .toBeInTheDocument()
        expect(screen.getByText('hello world').parentElement)
            .toHaveClass('ant-btn')
    })

    it('design/child-component.tpl', () => {
        const { Component: Fn, sourceMap } = build('child-component')
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
})