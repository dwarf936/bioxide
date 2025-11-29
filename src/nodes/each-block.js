export default (fragment, node) => {
    const expression = fragment.expression(node.expression)
    const values = fragment.values
    const eachblock = fragment.count('eachblock')
    const originalPos = node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : null
    fragment.setCurrent()
    fragment.addLine(`function ${eachblock}(${values.join(', ')}) {`, originalPos)
    fragment.indent(1)
    const context = node.context.name
    const index = node.index
    if (index) {
        fragment.addLine(`return ${expression.string}.map((${context}, ${index}) => {`, originalPos)
        fragment.values.push(context, index)
    } else {
        fragment.addLine(`return ${expression.string}.map((${context}) => {`, originalPos)
        fragment.values.push(context)
    }
    fragment.indent(1)
    fragment.returnWrapper(node)
    fragment.indent(-1)
    if (index) {
        fragment.values.pop()
        fragment.values.pop()
    } else {
        fragment.values.pop()
    }
    fragment.addLine(`})`)
    fragment.indent(-1)
    fragment.addLine(`}`)
    fragment.lastCurrent()
    fragment.addLine(`{ ${eachblock}(${values.join(', ')}) }`, originalPos)
}