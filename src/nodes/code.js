function spaces(indent, num = 2) {
    if (indent === 0) return ''
    const arr = new Array(indent * num)
    arr.fill(' ')
    return arr.join('')
}

export default class Code {
    constructor(options = {}) {
        this.code = []
        this.indent = 0
        this.noN = false
        this.sourceMap = options.sourceMap
        this.source = options.source || 'component.tpl'
        this.lineMap = []
        this.currentLine = 1
        this.currentColumn = 0
    }

    addCode(code, originalPos) {
        this.code.push(code)
        if (this.sourceMap && originalPos) {
            console.log(`Adding mapping for code: '${code}'`);
            console.log(`  Generated: ${this.currentLine}:${this.currentColumn}`);
            console.log(`  Original: ${originalPos.line}:${originalPos.column}`);
            this.lineMap.push({
                generatedLine: this.currentLine,
                generatedColumn: this.currentColumn,
                originalLine: originalPos.line,
                originalColumn: originalPos.column
            })
        }
        this.currentColumn += code.length
        // 处理换行符
        const newlines = code.match(/\n/g)
        if (newlines) {
            this.currentLine += newlines.length
            this.currentColumn = code.length - (code.lastIndexOf('\n') + 1)
        }
    }

    addLine(line, originalPos) {
        let lineCode
        if (this.noN) {
            lineCode = line
            this.noN = false
        } else {
            lineCode = `\n${spaces(this.indent)}${line}`
            this.currentLine++
            this.currentColumn = spaces(this.indent).length
        }
        this.code.push(lineCode)
        if (this.sourceMap && originalPos) {
            this.lineMap.push({
                generatedLine: this.currentLine,
                generatedColumn: this.currentColumn,
                originalLine: originalPos.line,
                originalColumn: originalPos.column
            })
        }
        this.currentColumn += line.length
        // 处理line中的换行符
        const newlines = line.match(/\n/g)
        if (newlines) {
            this.currentLine += newlines.length
            this.currentColumn = line.length - (line.lastIndexOf('\n') + 1)
        }
    }

    addBlock(block) {
        const lines = block.trim().split('\n')
        for (let i = 0; i < lines.length; i++) {
            this.addLine(lines[i])
        }
    }
    
    trimEnd(reg) {
        const last = this.code.pop()
        // TODO: trimEnd 不支持正则表达式
        this.code.push(last.trimEnd(reg))
    }
    
    noNeedN() {
        this.noN = true
    }

    toString(indent) {
        const res = this.code.join('')
        if (!indent) return res
        return res.replace(/\n/g, `\n${spaces(indent)}`)
    }

    getSourceMap() {
        if (!this.sourceMap) return null
        return this.lineMap.map(map => ({
            generated: { line: map.generatedLine, column: map.generatedColumn },
            original: { line: map.originalLine, column: map.originalColumn },
            source: this.source
        }))
    }

}