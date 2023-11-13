import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { fetcher } from '../utils/fetcher'
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import IrTitle from '../components/text/IrTitle';
import IrText from '../components/text/IrText';
import useLogin from '../hooks/useLogin'
import CenterImg from '../components/image/CenterImg'
import Container from '../components/container/Container'
import { Link } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  const hasLogin = useLogin()
  const navigate = useNavigate()
  const [isNum, setIsNum] = useState(1)
  const [product, setProduct] = useState({})
  const getProduct = async () => {
    const res = await fetcher('get', `/product/${id}`)
    setProduct(res)
  }

  const onPlus = () => {
    setIsNum(prev => prev + 1)
  }
  const onMinus = () => {
    if (isNum <= 1) return
    setIsNum(prev => prev - 1)
  }

  const onChangeHandle = (e) => {
    setIsNum(parseInt(e.target.value.replace(/[^0-9]/g, '')))
  }

  const onPayments = async () => {
    const payments = await fetcher('post', '/product/likes', { id, isNum })
  }

  useEffect(() => {
    getProduct()
  }, [id])
  console.log(product)
  return (
    <main>
      <Link to={'/product'}>
        Back
      </Link>
      {Object.keys(product).length !== 0 ?
        <>
          <IrTitle text={'상품 상세 페이지'} />
          <div className='product__detail-product-wrap'>
            <CenterImg src={product.productImage} alt={'상품 이미지'} />
            <Container>
              {product.likes.length !== 0 ? <Text cls={'product__detail-like-message'} text={`${product.likes.length}명이 관심을 가지고 있어요`} /> : ""}
              <Text text={product.owner.userName} />
              <Title text={product.productName} />
              <Text text={product.productDescription} />
              <Text cls={'product__detail-price'} text={`${product.productPrice.toLocaleString('ko-KR')}원`} />
              <div className='product__detail-price-wrap'>
                <div className='product__detail-amount-wrap'>
                  <button className={'product__detail-minus-btn'} onClick={onMinus}>
                    <IrText text={'수량 줄이기'} />
                  </button>
                  <input type='text' value={isNum} readOnly />
                  <button className={'product__detail-plus-btn'} onClick={onPlus}>
                    <IrText text={'수량 늘리기'} />
                  </button>
                </div>
                <p>
                  총 금액{(isNum * product.productPrice).toLocaleString('ko-KR')}원
              </p>
              </div>
              <div className='product__detail-button-wrap'>
                <div onClick={onPayments}>
                  장바구니
              </div>
                <div onClick={onPayments}>
                  관심등록
              </div>
                <div onClick={onPayments}>
                  바로구매
              </div>
              </div>
            </Container>
          </div>
        </>
        : ''}
    </main>
  )
}

export default ProductDetail
