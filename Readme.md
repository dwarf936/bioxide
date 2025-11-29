# bioxide

一个将 Svelte 模板转换为 React 组件的工具库。

## 功能特性

- 🔄 将 Svelte 模板语法转换为 React JSX
- 📍 支持 SourceMap 生成，便于调试
- 🎯 保持组件状态和生命周期
- 🚀 支持事件总线机制
- 🛠️ 支持条件渲染和列表渲染

## 安装

```bash
npm install bioxide
```

## 使用方法

### 基本用法

```javascript
import compile from 'bioxide'

const template = `
<script>
    export default {
        defaultState: { count: 0 }
    }
</script>

<div>Count: {state.count}</div>
`

const reactCode = compile(template)
console.log(reactCode)
```

### 使用 SourceMap 进行调试

从 v0.0.3 开始，bioxide 支持生成 SourceMap，帮助你在调试时定位到原始模板代码：

```javascript
import compile from 'bioxide'

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
    sourceFileName: 'my-component.tpl'
})

console.log('生成的代码:', result.code)
console.log('SourceMap:', result.map)
```

#### SourceMap 配置选项

- `sourceMap` (boolean): 是否生成 SourceMap，默认为 `false`
- `sourceFileName` (string): 源文件名，默认为 `'template.tpl'`

#### 在构建工具中使用 SourceMap

如果你使用 Webpack、Vite 或其他构建工具，可以将生成的 SourceMap 传递给它们：

```javascript
// Webpack loader 示例
module.exports = function(source) {
    const result = compile(source, {
        sourceMap: true,
        sourceFileName: this.resourcePath
    })
    
    this.callback(null, result.code, result.map)
}
```

```javascript
// Vite 插件示例
import bioxide from 'bioxide'

export default function vitePluginBioxide() {
    return {
        name: 'vite-plugin-bioxide',
        transform(code, id) {
            if (id.endsWith('.tpl')) {
                const result = bioxide(code, {
                    sourceMap: true,
                    sourceFileName: id
                })
                return {
                    code: result.code,
                    map: result.map
                }
            }
        }
    }
}
```

#### 调试技巧

1. **浏览器开发者工具**: 开启 SourceMap 后，你可以在浏览器的开发者工具中看到原始模板文件，而不是编译后的 React 代码。

2. **错误堆栈**: 当运行时错误发生时，错误堆栈会指向原始模板中的位置，而不是编译后的代码。

3. **VS Code 调试**: 配置 VS Code 的调试器来支持 SourceMap，可以直接在模板文件中设置断点。

### 模板语法

#### 状态管理

```html
<script>
    export default {
        defaultState: {
            message: 'Hello World',
            count: 0
        }
    }
</script>

<p>{state.message}</p>
<p>Count: {state.count}</p>
```

#### 事件处理

```html
<script>
    export default {
        register: {
            increment: (payload, { setState, state }) => {
                setState({ count: state.count + 1 })
            }
        }
    }
</script>

<button @trigger:increment>Click me</button>
```

#### 条件渲染

```html
{#if state.showContent}
    <div>Content is visible</div>
{/if}
```

#### 列表渲染

```html
{#each state.items as item}
    <li>{item}</li>
{/each}
```

## API 参考

### compile(template, options)

- `template` (string): Svelte 模板字符串
- `options` (object): 编译选项
  - `sourceMap` (boolean): 是否生成 SourceMap
  - `sourceFileName` (string): 源文件名
  - `dev` (boolean): 开发模式

返回值：
- 当 `sourceMap: false` 时，返回字符串（生成的 React 代码）
- 当 `sourceMap: true` 时，返回对象 `{ code: string, map: SourceMap }`

## 开发

```bash
# 运行测试
npm test

# 运行 SourceMap 测试
npm test -- test/sourcemap.test.js
```

## 许可证

MIT