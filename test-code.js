import React from 'react'

export default (props) => {
  const __ = props.__
  const $trigger = __ ? __.trigger : function () { console.warn('you should not use $trigger in thie component.') }
  return <>
      <p className="my-p" >a</p>
      <p className={["my-p ", props.className].join('')} >b</p>
      <p {...props}>c</p>
      <p className={props.className} >d</p>
      <p data-abc={props.a + props.b} >e</p>
    </>
}