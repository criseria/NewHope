import React from 'react'
import './text.css'

const Title = ({ tag: Tag = 'h2', text, hidden = false, light = false, gray = false, color, cls = '' }) => {
  return (
    <Tag className={`${Tag}__default  ${light ? 'text__light' : ''} ${hidden ? 'text__hidden' : ''} ${gray ? 'text__gray' : ''} ${cls === '' ? '' : cls}`} style={{ color: color !== '' ? color : '' }}>
      {text}
    </Tag>
  )
}

export default Title
