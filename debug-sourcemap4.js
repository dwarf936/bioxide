import compile from './src/index.js'

const template = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
`

console.log('Testing sourcemap content...')
const result = compile(template, { 
    sourceMap: true,
    sourceFileName: 'message.tpl'
})

console.log('Result type:', typeof result)
console.log('Result has code:', 'code' in result)
console.log('Result has map:', 'map' in result)

if (result.map) {
    console.log('Map object:', result.map)
    console.log('Map sourcesContent:', result.map.sourcesContent)
    console.log('Map sourcesContent[0] type:', typeof result.map.sourcesContent[0])
    console.log('Map sourcesContent[0] length:', result.map.sourcesContent[0].length)
    console.log('Map sourcesContent[0] preview:', result.map.sourcesContent[0].substring(0, 100))
    console.log('Map sources:', result.map.sources)
    
    // Let's also check the raw JSON string
    console.log('\nRaw JSON string:')
    console.log(JSON.stringify(result.map, null, 2))
}