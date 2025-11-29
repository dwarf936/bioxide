import plugin from '../lib/vite-plugin.js'

// Test the vite plugin with sourcemap
const testPlugin = plugin(true)

console.log('Testing vite plugin with sourcemap...')

// Test template content
const templateContent = `
<script>
    export default {
        defaultState: { message: "Hello World" }
    }
</script>

<p>{state.message}</p>
`

// Test the transform function
const result = await testPlugin.transform(templateContent, 'test.tpl')

console.log('Transform result:', {
  hasCode: !!result?.code,
  hasMap: !!result?.map,
  codeLength: result?.code?.length,
  mapType: typeof result?.map
})

if (result?.map) {
  console.log('Sourcemap info:', {
    version: result.map.version,
    sources: result.map.sources,
    sourcesContent: result.map.sourcesContent,
    hasTemplateContent: result.map.sourcesContent?.some(content => 
      content && content.includes('Hello World')
    )
  })
}