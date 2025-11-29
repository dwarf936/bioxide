export default (fragment, node, sourcePos = null) => {
    fragment.addCode(node.data, sourcePos)
    fragment.noNeedN()
}