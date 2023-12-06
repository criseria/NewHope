import { useState } from 'react'
import Title from '../text/Title'
import Text from '../text/Text'
import CenterImg from '../image/CenterImg'
import Time from '../text/Time'
import { Link } from 'react-router-dom'
import { onLike } from '../../pages/ProductDetail'

import './productcard.css'

const ProductCard = ({ _id, productName, productDescription, productImage, productPrice, owner, createdAt, updatedAt, isLike, username, year, month, date, address = '' }) => {
  const like = isLike.findIndex(i => i === _id) >= 0 ? true : false
  const [hasLike, setHasLike] = useState(like)

  const onClickHandle = async (e, username, _id) => {
    e.stopPropagation()
    e.preventDefault()
    const res = await onLike(username, _id)
    setHasLike(res)
  }

  return (
    <div className='product__card-wrap'>
      <Link to={`/product/${_id}`}>
        <CenterImg src={productImage} alt={productDescription} />
        <div className='product__card-info-wrap'>
          <Title text={productName} cls={'product__card-title'} />
          <Time year={year} month={month} date={date} cls={'product__cart_time'} />
          <Text text={address} cls={'product__card--address'} small gray bold />
          <Text text={productDescription} cls={'product__card--description'} gray />
          <Text text={`${productPrice.toLocaleString('ko-KR')}원`} cls={'product__card-price'} />
        </div>
        <button onClick={username !== '' ? (e) => onClickHandle(e, username, _id) : (e) => { e.preventDefault(); }}>
          {!hasLike ? '🤍' : '❤️'}
        </button>
      </Link>
    </div>
  )
}

export default ProductCard
