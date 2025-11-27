export default (fragment, node) => {
    const expression = fragment.expression(node.expression)
    const values = fragment.values
    const eachblock = fragment.count('eachblock')
    fragment.setCurrent()
    fragment.addLine(`function ${eachblock}(${values.join(', ')}) {`)
    fragment.indent(1)
    const context = node.context.name
    const index = node.index
    if (index) {
        fragment.addLine(`return ${expression.string}.map((${context}, ${index}) => {`)
        fragment.values.push(context, index)
    } else {
        fragment.addLine(`return ${expression.string}.map((${context}, ${index}) => {`)
        fragment.values.push(context, 'index')
    }
    fragment.indent(1)
    // 为列表项添加key prop
    const originalReturnWrapper = fragment.returnWrapper.bind(fragment)
    fragment.returnWrapper = (node) => {
        const isFragement = node.children.length > 1
        if (isFragement) {
            // 如果是片段，为每个子元素添加key prop
            fragment.addLine('return (')
            fragment.indent(1)
            node.children.forEach((child, i) => {
                if (child.type === 'Element') {
                    // 为元素添加key prop
                    const keyProp = `key={${index || 'i'}}`
                    const elementStart = fragment.code.slice(child.start + child.name.length + 1, child.end - 1)
                    fragment.addLine(`<${child.name} ${keyProp} ${elementStart}>`)
                    fragment.indent(1)
                    fragment.visit(child)
                    fragment.indent(-1)
                    fragment.addLine(`</${child.name}>`)
                } else {
                    // 其他类型的节点直接访问
                    fragment.visit(child)
                }
            })
            fragment.indent(-1)
            fragment.addLine(')')
        } else {
            // 如果不是片段，为第一个子元素添加key prop
            const firstChild = node.children[0]
            if (firstChild && firstChild.type === 'Element') {
                const keyProp = `key={${index || 'i'}}`
                const elementStart = fragment.code.slice(firstChild.start + firstChild.name.length + 1, firstChild.end - 1)
                fragment.addLine('return (')
                fragment.indent(1)
                fragment.addLine(`<${firstChild.name} ${keyProp} ${elementStart}>`)
                fragment.indent(1)
                fragment.visit(firstChild)
                fragment.indent(-1)
                fragment.addLine(`</${firstChild.name}>`)
                fragment.indent(-1)
                fragment.addLine(')')
            } else {
                // 如果没有子元素或者子元素不是Element，直接访问节点
                originalReturnWrapper(node)
            }
        }
    }
    fragment.returnWrapper(node)
    // 恢复原始的returnWrapper函数
    fragment.returnWrapper = originalReturnWrapper
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
    fragment.addLine(`{ ${eachblock}(${values.join(', ')}) }`)
}