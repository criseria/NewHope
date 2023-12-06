import React from 'react'
import './text.css'

const Text = ({
  text, hidden = false, bold = false, small = false, gray = false, color, cls = '' }) => {
  return (
    <p className={`text__default ${bold ? 'text__bold' : ''} ${hidden ? 'text__hidden' : ''} ${small ? 'text__small' : ''} ${gray ? 'text__gray' : ''} ${cls === '' ? '' : cls}`} style={{ color: color !== '' ? color : '' }}>
      {text}
    </p>
  )
}

export default Text
