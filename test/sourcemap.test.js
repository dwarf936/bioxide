import '@testing-library/jest-dom'
import React from 'react'
import {render} from '@testing-library/react'
import compile from '../src/index.js'
import { transformSync } from "@babel/core";
import { readFileSync } from 'fs'

describe('bioxide sourcemap', () => {
    it('should generate sourcemap when enabled', () => {
        const template = `
<script>
    export default {
        defaultState: { count: 0 }
    }
</script>

<div>Count: {state.count}</div>
        `
        
        const result = compile(template, { 
            sourceMap: true,
            sourceFileName: 'test.tpl'
        })
        
        expect(result).toHaveProperty('code')
        expect(result).toHaveProperty('map')
        expect(typeof result.code).toBe('string')
        expect(typeof result.map).toBe('object')
        expect(result.map.version).toBe(3)
        expect(result.map.sources).toContain('test.tpl')
        expect(result.map.mappings).toBeTruthy()
    })

    it('should not generate sourcemap when disabled', () => {
        const template = `
<script>
    export default {
        defaultState: { count: 0 }
    }
</script>

<div>Count: {state.count}</div>
        `
        
        const result = compile(template, { 
            sourceMap: false
        })
        
        expect(typeof result).toBe('string')
        expect(result).not.toHaveProperty('code')
        expect(result).not.toHaveProperty('map')
    })

    it('should include source content in sourcemap', () => {
        const template = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
        `
        
        const result = compile(template, { 
            sourceMap: true,
            sourceFileName: 'message.tpl'
        })
        
        expect(result.map.sourcesContent).toBeDefined()
        expect(result.map.sourcesContent[0]).toContain('Hello World')
    })

    it('should map template lines to generated code', () => {
        const template = `<div>Simple template</div>`
        
        const result = compile(template, { 
            sourceMap: true,
            sourceFileName: 'simple.tpl'
        })
        
        // Basic validation that mappings exist
        expect(result.map.mappings).toBeTruthy()
        expect(result.map.mappings.length).toBeGreaterThan(0)
    })

    it('should handle complex templates with sourcemap', () => {
        const template = `
<script>
    export default {
        defaultState: { 
            items: ['a', 'b', 'c'],
            showItems: true
        }
    }
</script>

{#if state.showItems}
    <ul>
    {#each state.items as item}
        <li>{item}</li>
    {/each}
    </ul>
{/if}
        `
        
        const result = compile(template, { 
            sourceMap: true,
            sourceFileName: 'complex.tpl'
        })
        
        expect(result).toHaveProperty('code')
        expect(result).toHaveProperty('map')
        expect(result.code).toContain('React')
        expect(result.map.sources).toContain('complex.tpl')
    })
})