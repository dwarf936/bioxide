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

// Check if any sourcesContent contains our template content
const hasTemplateContent = sourcemap.sourcesContent?.some(content => 
  content && content.includes('<script>') && content.includes('export default')
)
console.log('Has template content in sourcesContent:', hasTemplateContent)

// Look for specific template patterns
const templatePatterns = ['app.tpl', 'btn.tpl', 'el.tpl']
templatePatterns.forEach(pattern => {
  const foundInSources = sourcemap.sources.some(source => source.includes(pattern))
  const foundInContent = sourcemap.sourcesContent?.some(content => 
    content && content.includes(pattern)
  )
  console.log(`${pattern} - in sources: ${foundInSources}, in content: ${foundInContent}`)
})