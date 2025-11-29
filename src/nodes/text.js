export default (fragment, node) => {
    const originalPos = node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : null
    fragment.addCode(node.data, originalPos)
    fragment.noNeedN()
}