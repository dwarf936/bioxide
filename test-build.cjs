const { transformSync } = require("@babel/core");
const { readFileSync } = require('fs');
const { createRequire } = require('module');
const importModule = createRequire(__filename);
const { default: complie } = importModule('./src/index.js');

function build(name, debug) {
    const ncode = complie(
        readFileSync(`./design/${name}.tpl`, 'utf-8'), 
        { 
            test: true, 
            resolve: (name) => {
                return `./${name.slice(4)}.tpl`;
            },
            sourceMap: true,
            sourceFile: `${name}.tpl`
        }
    );
    debug && console.log('ncode === ', typeof ncode, ncode);
    const { code, map } = transformSync(ncode.code, {
        presets: ["@babel/preset-react"],
        plugins: ["@babel/plugin-transform-modules-commonjs"],
        sourceMaps: true
    });

    debug && console.log('ncode === ', ncode);
    debug && console.log('map === ', JSON.stringify(map, null, 2));

    return { code, map };
}

// 测试build函数
const { code, map } = build('el', true);
console.log('Generated code:');
console.log(code);