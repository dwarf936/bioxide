import attributes from "../utils/attributes.js"

export default (fragment, node) => {
    const originalPos = node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : null
    if (node.children.length === 0) {
        fragment.addLine(`<${node.name} `, originalPos)
        attributes(fragment, node.attributes)
        fragment.addCode(`/>`, originalPos)
    } else {
        fragment.addLine(`<${node.name}`, originalPos)
        if (node.attributes.length > 0) {
            fragment.addCode(' ', originalPos)
            attributes(fragment, node.attributes)
        }
        fragment.addCode(`>`, originalPos)
        fragment.indent(1)
        fragment.visit(node)
        fragment.indent(-1)
        fragment.addLine(`</${node.name}>`, originalPos)
    }
}