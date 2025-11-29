import compile from './src/index.js'

const template = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
`

console.log('Template content:')
console.log(template)
console.log('---')

console.log('Testing sourcemap content...')
const result = compile(template, { 
    sourceMap: true,
    sourceFileName: 'message.tpl'
})

console.log('Result has map:', !!result.map)

if (result.map) {
    console.log('Map sourcesContent:', result.map.sourcesContent)
    console.log('Map sourcesContent[0] preview:', result.map.sourcesContent[0].substring(0, 100))
}