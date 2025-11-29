export default (fragment, node, sourcePos = null) => {
    const expression = fragment.expression(node.expression)
    fragment.addCode(`{ ${expression.string} }`, sourcePos)
    fragment.noNeedN()
}