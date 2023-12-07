import React, { useEffect, useState } from 'react'
import { fetcher } from '../utils/fetcher'
import Title from '../components/text/Title'
import ProductCard from '../components/product/ProductCard'
import Container from '../components/container/Container'
import { useUserId } from '../hooks/useUserId'
import './product.css'
import Footer from '../components/Footer'

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
        <Title text={'다양한 봉사 활동을 만나보세요'} />
        <div className='product__product-item-list' style={{ marginTop: '24px' }} >
          {product.map(i => (
            <ProductCard key={i._id} {...i} isLike={isLike} username={username} />
          ))}
        </div>
      </Container>
      <Footer></Footer>
    </div>
  )
}

export default Product