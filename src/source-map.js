import { SourceMapGenerator } from 'source-map'

export default class SourceMapBuilder {
    constructor(sourceFileName) {
        this.generator = new SourceMapGenerator({
            file: sourceFileName || 'compiled.js'
        })
        this.sourceFileName = sourceFileName || 'template.tpl'
        this.generatedLine = 1
        this.generatedColumn = 0
        this.sourceLine = 1
        this.sourceColumn = 0
        this.currentMapping = null
    }

    addMapping(generatedPos, originalPos, sourceLine, sourceColumn) {
        if (originalPos || (sourceLine && sourceColumn !== undefined)) {
            this.generator.addMapping({
                generated: {
                    line: generatedPos.line || this.generatedLine,
                    column: generatedPos.column || this.generatedColumn
                },
                original: {
                    line: originalPos?.line || sourceLine,
                    column: originalPos?.column || sourceColumn
                },
                source: this.sourceFileName
            })
            
            // Ensure source is added to sources array
            if (!this.generator._sources.has(this.sourceFileName)) {
                this.generator._sources.add(this.sourceFileName)
            }
        }
    }

    addSourceContent(content) {
        this.sourceContent = content
        this.generator.setSourceContent(this.sourceFileName, content)
        return this
    }

    updateGeneratedPosition(line, column = 0) {
        this.generatedLine = line
        this.generatedColumn = column
    }

    advanceGeneratedLine() {
        this.generatedLine++
        this.generatedColumn = 0
    }

    advanceGeneratedColumn(delta) {
        this.generatedColumn += delta
    }

    toString() {
        return this.generator.toString()
    }

    toJSON() {
        const json = this.generator.toJSON()
        // Ensure sources and sourcesContent are properly set
        if (!json.sources || json.sources.length === 0) {
            json.sources = [this.sourceFileName]
        }
        if (this.sourceContent) {
            json.sourcesContent = [this.sourceContent]
        }
        return json
    }
}

export function createSourceMap(sourceFileName, sourceContent) {
    const builder = new SourceMapBuilder(sourceFileName)
    if (sourceContent) {
        builder.addSourceContent(sourceContent)
    }
    return builder
}