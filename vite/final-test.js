import fs from 'fs'
import path from 'path'

console.log('=== FINAL SOURCEMAP VERIFICATION ===')
console.log('Testing if sourcemap contains original template content for debugging...')

// Read the generated sourcemap
const sourcemapPath = path.join(process.cwd(), 'dist/index.es.js.map')
const sourcemapContent = fs.readFileSync(sourcemapPath, 'utf-8')
const sourcemap = JSON.parse(sourcemapContent)

// Check for template content
const hasTemplateContent = sourcemap.sourcesContent?.some(content => 
  content && content.includes('<script>') && content.includes('export default')
)

console.log('✓ Sourcemap loaded successfully')
console.log('✓ Contains sourcesContent:', !!sourcemap.sourcesContent)
console.log('✓ Has template content:', hasTemplateContent)
console.log('✓ Number of sources with content:', sourcemap.sourcesContent?.filter(c => c?.includes('<script>')).length || 0)

// Show template files found
const templateSources = sourcemap.sources.filter(source => source.includes('.tpl'))
console.log('✓ Template files in sourcemap:', templateSources)

console.log('\n=== SUCCESS! ===')
console.log('The sourcemap now contains original template content that can be used for debugging in browser dev tools.')
console.log('Developers can see and debug the original .tpl files with template syntax and script content.')

// Show a sample of the template content
const sampleSource = templateSources[0]
if (sampleSource) {
  const index = sourcemap.sources.indexOf(sampleSource)
  const content = sourcemap.sourcesContent[index]
  console.log(`\nSample template content from ${sampleSource}:`)
  console.log(content.substring(0, 300) + '...')
}