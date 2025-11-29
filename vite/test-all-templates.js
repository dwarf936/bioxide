import plugin from '../lib/vite-plugin.js'
import fs from 'fs'
import path from 'path'

const testPlugin = plugin(true)

console.log('Testing all template files...')

// Test all template files
const templates = [
  { path: 'src/app.tpl', content: fs.readFileSync(path.join(process.cwd(), 'src/app.tpl'), 'utf-8') },
  { path: 'src/btn.tpl', content: fs.readFileSync(path.join(process.cwd(), 'src/btn.tpl'), 'utf-8') },
  { path: 'src/el.tpl', content: fs.readFileSync(path.join(process.cwd(), 'src/el.tpl'), 'utf-8') }
]

templates.forEach(({ path, content }) => {
  console.log(`\n=== Testing ${path} ===`)
  console.log('Content preview:', content.substring(0, 50) + '...')
  
  const result = testPlugin.transform(content, path)
  
  if (!result) {
    console.log('Plugin returned null (not processed)')
    return
  }
  
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
      hasSourcesContent: !!result.map.sourcesContent,
      sourcesContentCount: result.map.sourcesContent?.length
    })
    
    if (result.map.sourcesContent?.length > 0) {
      console.log('First sourcesContent preview:', result.map.sourcesContent[0].substring(0, 100) + '...')
    }
  }
})