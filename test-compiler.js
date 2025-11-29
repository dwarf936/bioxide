import compile from './src/index.js'

// Test the compiler directly
const templateContent = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
`

console.log('Testing compiler directly...')

const result = compile(templateContent, { 
    sourceMap: true,
    sourceFileName: 'test.tpl'
})

console.log('Compiler result:', {
    hasCode: !!result.code,
    hasMap: !!result.map,
    codeLength: result.code?.length,
    mapType: typeof result.map
})

if (result.map) {
    console.log('Original sourcemap info:', {
        version: result.map.version,
        sources: result.map.sources,
        sourcesContent: result.map.sourcesContent,
        hasTemplateContent: result.map.sourcesContent?.some(content => 
            content && content.includes('Hello World')
        )
    })
}