import compile from './src/index.js'

// Test the compiler directly - show generated code
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

console.log('Generated code:')
console.log(result.code)
console.log('\nSourcemap:')
console.log(JSON.stringify(result.map, null, 2))