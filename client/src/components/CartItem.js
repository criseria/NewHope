import React from 'react'
import CenterImg from './image/CenterImg'
import ProductQuantity from './ProductQuantity'
import Text from './text/Text'
import Time from './text/Time'
import Title from './text/Title'
import { Link } from 'react-router-dom'

const CartItem = ({ quantity, itemId, checked, _id, cart = false,
  onCheckHandle, onPlusHandle, onMinusHandle, deleteItem }) => {
  // console.log(quantity, itemId, checked)
  return (
    <div className='cart__cart-item'>
      {cart
        ?
        <span onClick={onCheckHandle}
          className='cart__cart-check-button'>
          <img src={checked ? '/check.png' : '/check_outline.png'} />
        </span>
        : ''}
      <div onClick={onCheckHandle} className={'cart__cart-item-img'}>
        <CenterImg src={itemId.productImage} alt={itemId.productDsecription} />
      </div>
      <div className='cart__cart-item-info'>
        <div className='cart__item-cart-info'>
          <Link to={`/product/${itemId._id}`}>
            <Title text={itemId.productName} hidden cls={'cart__item-title'} />
          </Link>
          <div className='cart__item-place-wrap'>
            <Text text={itemId.address} cls={'lh-20'} hidden gray />
            <Time year={itemId.year} month={itemId.month} date={itemId.date} cls={'product__cart_time'} />
          </div>
          <Text text={`${itemId.productPrice.toLocaleString('ko-KR')}원`} small bold gray />
        </div>
        <div className='cart__item-price-wrap'>
          <Text text={`${(itemId.productPrice * quantity).toLocaleString('ko-KR')}원`} color={'#ff8d8d'} bold />
          {cart ?
            <ProductQuantity quantity={quantity} onMinus={onMinusHandle} onPlus={onPlusHandle} />
            :
            <Text text={`구매 수량 : ${quantity}개`} bold gray />
          }
        </div>
      </div>
      <div>
      </div>
      {cart ?
        <button className='cart__item-delete-button'
          onClick={deleteItem}>
          삭제
          </button>
        : ""}
    </div>
  )
}

export default CartItem
