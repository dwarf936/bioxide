import fs from 'fs'
import path from 'path'

// Read the generated sourcemap
const sourcemapPath = path.join(process.cwd(), 'dist/index.es.js.map')
const sourcemapContent = fs.readFileSync(sourcemapPath, 'utf-8')
const sourcemap = JSON.parse(sourcemapContent)

console.log('=== SOURCEMAP ANALYSIS ===')
console.log('Version:', sourcemap.version)
console.log('File:', sourcemap.file)
console.log('Sources count:', sourcemap.sources?.length)
console.log('SourcesContent count:', sourcemap.sourcesContent?.length)

// Look for all template-related sources
const tplSources = sourcemap.sources.filter(source => 
  source.includes('.tpl') || 
  source.includes('template') ||
  source.includes('src/')
)

console.log('\n=== TEMPLATE SOURCES ===')
tplSources.forEach(source => {
  const index = sourcemap.sources.indexOf(source)
  const content = sourcemap.sourcesContent?.[index]
  console.log(`\nSource: ${source}`)
  console.log(`Has content: ${!!content}`)
  if (content) {
    console.log(`Content length: ${content.length}`)
    console.log(`Contains script: ${content.includes('<script>')}`)
    console.log(`Contains export: ${content.includes('export default')}`)
    console.log(`Preview: ${content.substring(0, 100)}...`)
  }
})

// Check if app.tpl and btn.tpl content might be in other sources
console.log('\n=== SEARCHING FOR MISSING TEMPLATES ===')
const missingTemplates = ['app.tpl', 'btn.tpl']
missingTemplates.forEach(template => {
  console.log(`\nSearching for ${template} content...`)
  const foundInContent = sourcemap.sourcesContent?.some((content, index) => {
    if (content && content.includes(template)) {
      console.log(`Found in source: ${sourcemap.sources[index]}`)
      return true
    }
    return false
  })
  if (!foundInContent) {
    console.log(`No content found for ${template}`)
  }
})