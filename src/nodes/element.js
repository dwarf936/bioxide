import attributes from "../utils/attributes.js"

export default (fragment, node, sourcePos = null) => {
    if (node.children.length === 0) {
        fragment.addLine(`<${node.name} `, sourcePos)
        attributes(fragment, node.attributes)
        fragment.addCode(`/>`)
    } else {
        fragment.addLine(`<${node.name}`, sourcePos)
        if (node.attributes.length > 0) {
            fragment.addCode(' ')
            attributes(fragment, node.attributes)
        }
        fragment.addCode(`>`)
        fragment.indent(1)
        fragment.visit(node)
        fragment.indent(-1)
        fragment.addLine(`</${node.name}>`, sourcePos)
    }
}