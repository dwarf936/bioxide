import fs from 'fs'
import path from 'path'

// Read the actual template files to see their content
const templates = {
  'app.tpl': fs.readFileSync(path.join(process.cwd(), 'src/app.tpl'), 'utf-8'),
  'btn.tpl': fs.readFileSync(path.join(process.cwd(), 'src/btn.tpl'), 'utf-8'),
  'el.tpl': fs.readFileSync(path.join(process.cwd(), 'src/el.tpl'), 'utf-8')
}

console.log('=== TEMPLATE CONTENTS ===')
Object.entries(templates).forEach(([name, content]) => {
  console.log(`\n${name}:`)
  console.log(content)
})

// Read the sourcemap
const sourcemapPath = path.join(process.cwd(), 'dist/index.es.js.map')
const sourcemapContent = fs.readFileSync(sourcemapPath, 'utf-8')
const sourcemap = JSON.parse(sourcemapContent)

console.log('\n=== SEARCHING FOR TEMPLATE CONTENT IN SOURCEMAP ===')

// Search for specific content from each template
Object.entries(templates).forEach(([name, content]) => {
  console.log(`\nSearching for ${name} content...`)
  
  // Look for key phrases from each template
  let searchTerms = []
  if (name === 'btn.tpl') {
    searchTerms = ['handleClick', 'count + 1', 'count - 1', 'Button']
  } else if (name === 'el.tpl') {
    searchTerms = ['defaultState: { count: 0 }', 'hello world', 'change: (payload']
  } else if (name === 'app.tpl') {
    searchTerms = ['Tpl:el', 'Tpl:btn', '@register', '@trigger']
  }
  
  searchTerms.forEach(term => {
    const foundInContent = sourcemap.sourcesContent?.some((content, index) => {
      if (content && content.includes(term)) {
        console.log(`Found "${term}" in source: ${sourcemap.sources[index]}`)
        return true
      }
      return false
    })
    if (!foundInContent) {
      console.log(`Term "${term}" not found in any sourcesContent`)
    }
  })
})