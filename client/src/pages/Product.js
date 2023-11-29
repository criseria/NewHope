import React, { useEffect, useState } from 'react'
import { fetcher } from '../utils/fetcher'
import IrTitle from '../components/text/IrTitle'
import ProductCard from '../components/product/ProductCard'
import Container from '../components/container/Container'

import './product.css'

const Product = () => {
  const [product, setProduct] = useState([])
  const [isLike, setIsLike] = useState([])

  const username = '6554b0620567c42fd1c5c405'

  const getProduct = async () => {
    const res = await fetcher('get', '/product')
    if (username !== '') {
      const user = await fetcher('get', `/product/likes/${username}`)
      setIsLike(user.likes)
    }
    setProduct(res)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div>
      <Container>
        <IrTitle text={'상품 페이지'} />
        <div className='product__product-item-list'>
          {product.map(i => (
            <ProductCard key={i._id} {...i} isLike={isLike} username={username} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Product
