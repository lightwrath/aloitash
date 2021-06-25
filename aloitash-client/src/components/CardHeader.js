import React, { fragment } from 'react'

export default function CardHeader(props) {
  return (
    <>
      <div style={{ height: '100px', width: '100%' }}>
        <img src={props.icon} title={props.hoverText} style={{ margin: 'auto', width: '100px' }} />
      </div>
      <h4>{props.text}</h4>
    </>
  )
}
