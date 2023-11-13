import React, { useEffect, useState } from 'react'
import { fetcher } from '../utils/fetcher'
import IrTitle from '../components/text/IrTitle'
import Title from '../components/text/Title'
import Text from '../components/text/Text'
import ProductCard from '../components/product/ProdcutCard'
import Container from '../components/container/Container'

import './product.css'
import ProdcutCard from '../components/product/ProdcutCard'

const Product = () => {
  const [product, setProduct] = useState([])

  const getProduct = async () => {
    const res = await fetcher('get', '/product')
    setProduct(res)
  }

  useEffect(() => {
    getProduct()
  }, [])

  console.log(product)
  return (
    <div>
      <Container>
        <IrTitle text={'상품 페이지'} />
        <div className='product__product-item-list'>
          {product.map(i => (
            <ProdcutCard key={i._id} {...i} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Product
