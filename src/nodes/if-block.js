function createIfBlock(fragment, node) {
    const originalPos = node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : null
    const expression = fragment.expression(node.expression)
    if (node.elseif) {
        fragment.addLine(`} else if (${expression.string}) {`, originalPos)
    }  else {
        fragment.addLine(`if (${expression.string}) {`, originalPos)
    }
    fragment.indent(1)
    fragment.returnWrapper(node)
    fragment.indent(-1)
    if (node.else) {
        node.else.children.forEach(child => {
            if (child.type === 'IfBlock') {
                // in else if
                createIfBlock(fragment, child)
            } else {
                // in else
                const elsePos = node.else.loc ? { line: node.else.loc.start.line, column: node.else.loc.start.column } : null
                fragment.addLine(`} else {`, elsePos)
                fragment.indent(1)
                fragment.returnWrapper(node.else)
                fragment.indent(-1)
                fragment.addLine(`}`)
            }
        })
    } else {
        fragment.addLine('}')
    }
}

export default (fragment, node) => {
    const ifblock = fragment.count(node.else ? 'if_elseblock' : 'ifblock')
    const values = fragment.values
    const originalPos = node.loc ? { line: node.loc.start.line, column: node.loc.start.column } : null
    fragment.setCurrent()
    fragment.addLine(`function ${ifblock}({${values.join(', ')}}) {`, originalPos)
    fragment.indent(1)
    createIfBlock(fragment, node)
    fragment.indent(-1)
    fragment.addLine(`}`)
    fragment.lastCurrent()
    fragment.addLine(`{ ${ifblock}({${values.join(', ')}}) }`, originalPos)
}