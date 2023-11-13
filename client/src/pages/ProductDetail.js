import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { fetcher } from '../utils/fetcher'
const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const getProduct = async () => {
    const res = await fetcher('get', `/product/${id}`)
    // setProduct(res)
  }

  useEffect(() => {
    getProduct()
  }, [id])
  return (
    <div>
      {id}
    </div>
  )
}

export default ProductDetail
