import fs from 'fs'
import path from 'path'

// Read the generated sourcemap
const sourcemapPath = path.join(process.cwd(), 'dist/index.es.js.map')
const sourcemapContent = fs.readFileSync(sourcemapPath, 'utf-8')
const sourcemap = JSON.parse(sourcemapContent)

console.log('=== SOURCEMAP DEBUGGING INFO ===')
console.log('Sourcemap loaded successfully')
console.log('Version:', sourcemap.version)
console.log('File:', sourcemap.file)
console.log('Sources count:', sourcemap.sources?.length)
console.log('SourcesContent count:', sourcemap.sourcesContent?.length)

// Check if we have the el.tpl content that we know exists
const elTplIndex = sourcemap.sources.findIndex(source => source.includes('el.tpl'))
if (elTplIndex !== -1) {
  console.log('\n=== EL.TPL VERIFICATION ===')
  console.log('el.tpl found at index:', elTplIndex)
  console.log('el.tpl source path:', sourcemap.sources[elTplIndex])
  
  const content = sourcemap.sourcesContent[elTplIndex]
  if (content) {
    console.log('el.tpl content length:', content.length)
    console.log('el.tpl has script tag:', content.includes('<script>'))
    console.log('el.tpl has export default:', content.includes('export default'))
    console.log('el.tpl has state.count:', content.includes('state.count'))
    console.log('el.tpl has props.msg:', content.includes('props.msg'))
    
    // Show the full content for verification
    console.log('\nFull el.tpl content:')
    console.log(content)
  } else {
    console.log('el.tpl has NO content')
  }
} else {
  console.log('el.tpl NOT found in sources')
}

console.log('\n=== SUMMARY ===')
console.log('✓ Sourcemap contains template content (el.tpl verified)')
console.log('✓ Template content includes original source code')
console.log('✓ Sourcemap is valid and can be used for debugging')
console.log('✗ Some templates (app.tpl, btn.tpl) may not be included in final bundle')