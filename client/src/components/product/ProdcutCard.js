import React from 'react'
import Title from '../text/Title'
import Text from '../text/Text'
import CenterImg from '../image/CenterImg'
import { Link } from 'react-router-dom'

import './productcard.css'

const ProdcutCard = ({ _id, productName, productDescription, productImage, productPrice, owner, createdAt, updatedAt }) => {
  return (
    <div className='product__card-wrap'>
      <Link to={`/product/${_id}`}>
        <CenterImg src={productImage} alt={productDescription} />
        <Title text={productName} />
        <Text text={productPrice} />
      </Link>
    </div>
  )
}

export default ProdcutCard
