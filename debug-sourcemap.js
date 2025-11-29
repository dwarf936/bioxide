import compile from './src/index.js'

const template = `
<script>
    export default {
        defaultState: { count: 0 }
    }
</script>

<div>Count: {state.count}</div>
`

console.log('Testing SourceMap generation...')

const result = compile(template, { 
    sourceMap: true,
    sourceFileName: 'test.tpl'
})

console.log('Result:', JSON.stringify(result, null, 2))
console.log('Map object:', result.map)
console.log('Map JSON:', JSON.stringify(result.map, null, 2))