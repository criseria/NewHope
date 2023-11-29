import { useState } from 'react'
import Title from '../text/Title'
import Text from '../text/Text'
import CenterImg from '../image/CenterImg'
import Time from '../text/Time'
import { Link } from 'react-router-dom'
import { onLike } from '../../pages/ProductDetail'

import './productcard.css'

const MiniCard = ({ _id, productName, productDescription, productImage, productPrice, owner, createdAt, updatedAt, isLike, username, year, month, date, address = '' }) => {

  return (
    <div className='product__mini-card-wrap'>
      <Link className='product__mini-card' to={`/product/${_id}`}>
        <CenterImg src={productImage} alt={productDescription} />
        <div className='product__mini-card-info-wrap'>
          <Title text={productName} tag={'h3'} cls={'product__card-title'} hidden />
          <Time year={year} month={month} date={date} cls={'product__cart_time'} />
          <Text text={address} cls={'product__card--address'} small gray bold hidden />
        </div>
      </Link>
    </div>
  )
}

export default MiniCard
