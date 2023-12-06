import React from 'react'

const ProductInput = ({ text, id, value, setValue, ph }) => {
  return (
    <div className={'product__create-input-item'}>
      <label htmlFor={id} >
        {text}
      </label>
      <input type={'text'} placeholder={ph} id={id} value={value} onChange={setValue} />
    </div>
  )
}

export default ProductInput
