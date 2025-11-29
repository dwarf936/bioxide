import complier from '../src/index.js'
import babel from '@babel/core'

export default function (dev) {
  return {
    name: 'transform-bioxide',
    transform(src, id) {
      if (!id.endsWith('.tpl')) return

      // Compile the template
      const { code, map } = complier(src, { dev, resolve: (name) => { return `./${name.slice(4)}.tpl` }, sourceMap: true })
      
      // Transform with Babel to convert JSX to plain JavaScript
      const res = babel.transformSync(code, {
        presets: ["@babel/preset-react"],
        sourceMaps: true,
        sourceFileName: id,
        inputSourceMap: map
      })
      
      // If Babel's sourcemap is empty or invalid, use our original sourcemap
      if (!res.map || !res.map.sources?.length) {
        return { 
          code: res.code,
          map: map
        }
      }
      
      // Otherwise use Babel's result
      return { 
        code: res.code,
        map: res.map
      }
    }
  }
}