import React, { useEffect, useState } from 'react'
import { fetcher } from '../utils/fetcher'
import IrTitle from '../components/text/IrTitle'
import ProductCard from '../components/product/ProductCard'
import Container from '../components/container/Container'
import { useUserId } from '../hooks/useUserId'
import './product.css'

const Product = () => {
  const [product, setProduct] = useState([])
  const [isLike, setIsLike] = useState([])
  const { username, getUserId } = useUserId()

  const getProduct = async () => {
    const res = await fetcher('get', '/product')
    if (username !== '') {
      const user = await fetcher('get', `/product/likes/${username}`)
      setIsLike(user.likes)
    }
    setProduct(res)
  }

  useEffect(() => {
    getUserId()
    if (username === undefined) return
    getProduct()
  }, [username])

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