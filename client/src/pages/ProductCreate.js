import React, { useState, useEffect } from 'react'
import { fetcher } from '../utils/fetcher'
import IrTitle from '../components/text/IrTitle'
import ProductInput from '../components/product/ProductInput'
import ProductDate from '../components/product/ProductDate'
import Container from '../components/container/Container'
import { useNavigate } from 'react-router'
import UploadWidget from '../components/UploadWidget'
import { Link } from 'react-router-dom'
import { useUserId } from '../hooks/useUserId'

import './product.css'

const ProductCreate = () => {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [address, setAddress] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [date, setDate] = useState(new Date().getDate())
  const { username, admin, getUserId } = useUserId()

  const onSubmitHandle = async (e) => {
    e.stopPropagation()
    e.preventDefault()

    if (!productName || !productImage || !address || !productDescription || !productPrice || !year || !month || !date) {
      return console.log('필수 영역이 입력되지 않았습니다.')
    }

    const res = await fetcher('post', '/product/create', { username, productName, year, month, date, address, productDescription, productImage, productPrice })
    return navigate(`/product/${res._id}`)
  }

  useEffect(() => {
    getUserId()
    if (username === undefined) return
    if (!admin) {
      alert('관리자만 작성할 수 있습니다.')
      return navigate('/')
    }
  }, [username, admin])

  return (
    <div>
      <Container>
        <IrTitle text={'상품 등록 페이지'} />
        <form onSubmit={onSubmitHandle} className='product__create-form'>
          <UploadWidget value={productImage} setValue={(src) => setProductImage(src)} />
          <div className='product__create-input-wrap'>
            <ProductInput ph={'제목을 입력해주세요.'} value={productName} setValue={(e) => { setProductName(e.target.value) }} id={'productName'} text={'제목'} />
            <ProductInput ph={'장소를 입력해주세요.'} value={address} setValue={(e) => { setAddress(e.target.value) }} id={'address'} text={'장소'} />
            <ProductInput ph={'가격을 입력해주세요.'} value={productPrice} setValue={(e) => { setProductPrice(e.target.value.replace(/[^0-9]/g, '')) }} id={'productPrice'} text={'가격'} />
            <ProductInput ph={'설명을 입력해주세요.'} value={productDescription} setValue={(e) => { setProductDescription(e.target.value) }} id={'productDescription'} text={'설명'} />
            <ProductDate year={year} month={month} date={date} setMonth={(e) => setMonth(e.target.value)} setYear={(e) => setYear(e.target.value)} setDate={(e) => setDate(e.target.value)} id={'productDate'} text={'날짜'} />
          </div>
          <div className='product__create-button-wrap'>
            <button>등록</button>
            <Link to={'/'}>취소</Link>
          </div>
        </form>
      </Container>
    </div>
  )
}

export default ProductCreate
