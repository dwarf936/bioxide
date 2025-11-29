import fs from 'fs'
import path from 'path'

// Read the actual built file to see what's in it
const builtFile = path.join(process.cwd(), 'dist/index.es.js')
const builtContent = fs.readFileSync(builtFile, 'utf-8')

console.log('=== BUILT FILE ANALYSIS ===')
console.log('File size:', builtContent.length)

// Look for our template content in the built file
const templates = {
  'app.tpl': '<Tpl:el',
  'btn.tpl': '<Tpl:btn', 
  'el.tpl': 'hello world'
}

Object.entries(templates).forEach(([name, searchTerm]) => {
  const found = builtContent.includes(searchTerm)
  console.log(`${name} content found in built file: ${found}`)
})

// Look for React.createElement calls (transformed JSX)
const reactElements = (builtContent.match(/React\.createElement/g) || []).length
console.log(`React.createElement calls: ${reactElements}`)

// Look for template variable names
const templateVars = builtContent.match(/Tpl__\w+/g)
if (templateVars) {
  console.log('Template variables found:', [...new Set(templateVars)])
}

// Check if templates are imported/required
const imports = builtContent.match(/import.*\.tpl['"]/g)
if (imports) {
  console.log('Template imports found:', imports)
}