export default (fragment, node) => {
    const expression = fragment.expression(node.expression)
    const originalPos = node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : null
    fragment.addCode(`{ ${expression.string} }`, originalPos)
    fragment.noNeedN()
}