import React from 'react'
import IrText from './text/IrText'

const ProductQuantity = ({ quantity, onPlus, onMinus }) => {

  return (
    <div className='product__detail-quantity-wrap'>
      <button className={'product__detail-minus-btn'} onClick={onMinus}>
        <IrText text={'수량 줄이기'} />
      </button>
      <input type='text' value={quantity} readOnly />
      <button className={'product__detail-plus-btn'} onClick={onPlus}>
        <IrText text={'수량 늘리기'} />
      </button>
    </div>
  )
}

export default ProductQuantity
