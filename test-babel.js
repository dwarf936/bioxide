import complier from './src/index.js'
import babel from '@babel/core'

// Test Babel transformation
const src = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
`

console.log('Testing Babel transformation...')

// Compile the template
const { code, map } = complier(src, { dev: false, resolve: (name) => { return `./${name.slice(4)}.tpl` }, sourceMap: true })

console.log('Original code:')
console.log(code)
console.log('\nOriginal map:')
console.log(JSON.stringify(map, null, 2))

// Test Babel transformation
const res = babel.transformSync(code, {
  presets: ["@babel/preset-react"],
  sourceMaps: true,
  sourceFileName: 'test.tpl',
  inputSourceMap: map
})

console.log('\nBabel transformed code:')
console.log(res.code)
console.log('\nBabel map:')
console.log(JSON.stringify(res.map, null, 2))

console.log('\nComparison:')
console.log('Code changed:', res.code !== code)
console.log('Has map sources:', res.map?.sources?.length > 0)