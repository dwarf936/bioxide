function spaces(indent, num = 2) {
    if (indent === 0) return ''
    const arr = new Array(indent * num)
    arr.fill(' ')
    return arr.join('')
}

export default class Code {
    constructor(sourceMapBuilder = null) {
        this.code = []
        this.indent = 0
        this.noN = false
        this.sourceMapBuilder = sourceMapBuilder
        this.generatedLine = 1
        this.generatedColumn = 0
        this.sourcePositions = new Map() // Track source positions for generated code
    }

    addCode(code, sourcePosition = null) {
        if (this.sourceMapBuilder && sourcePosition) {
            this.sourceMapBuilder.addMapping(
                { line: this.generatedLine, column: this.generatedColumn },
                sourcePosition
            )
        }
        this.code.push(code)
        this.generatedColumn += code.length
    }

    addLine(line, sourcePosition = null) {
        const indentSpaces = spaces(this.indent)
        const fullLine = this.noN ? line : `\n${indentSpaces}${line}`
        
        if (this.sourceMapBuilder && sourcePosition) {
            this.sourceMapBuilder.addMapping(
                { line: this.generatedLine, column: this.generatedColumn },
                sourcePosition,
                sourcePosition.line,
                sourcePosition.column
            )
        }
        
        this.code.push(fullLine)
        
        // Count newlines to update position
        const newlines = (fullLine.match(/\n/g) || []).length
        if (newlines > 0) {
            this.generatedLine += newlines
            // Set column to the end of the last line
            const lastNewlineIndex = fullLine.lastIndexOf('\n')
            this.generatedColumn = fullLine.length - lastNewlineIndex - 1
        } else {
            this.generatedColumn += fullLine.length
        }
        
        this.noN = false
    }

    addBlock(block, sourcePosition = null) {
        const lines = block.trim().split('\n')
        for (let i = 0; i < lines.length; i++) {
            this.addLine(lines[i], sourcePosition)
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

}