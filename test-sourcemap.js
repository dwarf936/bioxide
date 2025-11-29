import { parse } from 'svelte/compiler'
import Component from './src/component.js'

// 测试用例：简单的Svelte组件代码（没有事件处理程序）
const svelteCode = `
<script>
  let name = 'World'
  let count = 0
</script>

<h1>Hello, {name}!</h1>
<p>Count: {count}</p>
<button>Increment</button>
`

// 解析Svelte代码
const ast = parse(svelteCode)

// 创建Component实例并生成代码
const component = new Component(svelteCode, ast, {
  sourceMap: true,
  componentName: 'TestComponent',
  sourceFile: 'test-component.svelte'
})

const result = component.generate()

console.log('Generated code:')
console.log(result.code)
console.log('\n\nSource map:')
console.log(JSON.stringify(result.sourceMap, null, 2))
