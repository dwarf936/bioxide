import complier from './src/index.js'

// Test what compiler generates
const src = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
`

console.log('Testing compiler output...')

// Compile the template
const { code, map } = complier(src, { dev: false, resolve: (name) => { return `./${name.slice(4)}.tpl` }, sourceMap: true })

console.log('Generated code:')
console.log(code)

console.log('\nTrying to parse as JavaScript...')
try {
  new Function(code)
  console.log('✓ Code is valid JavaScript')
} catch (e) {
  console.log('✗ Code has syntax error:', e.message)
}