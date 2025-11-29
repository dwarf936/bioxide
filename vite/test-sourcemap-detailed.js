import fs from 'fs'
import path from 'path'

// Read the generated sourcemap
const sourcemapPath = path.join(process.cwd(), 'dist/index.es.js.map')
const sourcemapContent = fs.readFileSync(sourcemapPath, 'utf-8')
const sourcemap = JSON.parse(sourcemapContent)

console.log('Sourcemap version:', sourcemap.version)
console.log('Number of sources:', sourcemap.sources?.length)
console.log('Has sourcesContent:', !!sourcemap.sourcesContent)
console.log('Number of sourcesContent:', sourcemap.sourcesContent?.length)

// Look for our template files in sources
const templateSources = sourcemap.sources.filter(source => source.includes('.tpl'))
console.log('Template sources found:', templateSources)

// Check each template source
if (sourcemap.sourcesContent) {
  sourcemap.sources.forEach((source, index) => {
    if (source.includes('.tpl')) {
      const content = sourcemap.sourcesContent[index]
      console.log(`\n=== ${source} ===`)
      console.log('Content preview:', content ? content.substring(0, 200) + '...' : 'NO CONTENT')
      console.log('Has script tag:', content && content.includes('<script>'))
      console.log('Has template content:', content && content.includes('export default'))
    }
  })
}