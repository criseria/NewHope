import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import { fetcher } from '../utils/fetcher'
import Text from '../components/text/Text';
import Time from '../components/text/Time';
import Title from '../components/text/Title';
import IrTitle from '../components/text/IrTitle';
import MiniCard from '../components/product/MiniCard';
import Calendar from '../components/calendar/Calendar';
import useLogin from '../hooks/useLogin'
import CenterImg from '../components/image/CenterImg'
import { Link } from 'react-router-dom'
import { useUserId } from '../hooks/useUserId'
import ProductQuantity from '../components/ProductQuantity'

export const onLike = async (username, id) => {
  // 좋아요, 좋아요 취소
  const like = await fetcher('post', '/product/likes', { username, id })
  const res = like.likes.findIndex(i => i === id) >= 0 ? true : false
  return res
}

const ProductDetail = () => {
  const { id } = useParams()
  const hasLogin = useLogin()
  const txtRef = useRef(null)
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isLike, setIsLike] = useState(false)
  const [cartItem, setCartItem] = useState(0)
  const [msg, setMsg] = useState(false)
  const [product, setProduct] = useState({})
  const [hasItem, setHasItem] = useState([])
  const { username, getUserId } = useUserId()

  const getProduct = async () => {
    // if (id.replace(/[^0-9,a-f]/g, '').length !== 24) {
    //   return navigate('/')
    // }
    const product = await fetcher('get', `/product/${id}`)
    if (product.status === 'failed') {
      return navigate('/notfound')
    }
    setProduct(product.targetProduct)
    setHasItem(product.targetCategory)

    if (username !== '') {
      const user = await fetcher('get', `/product/likes/${username}`)
      setIsLike(user.likes.findIndex(i => i === id) >= 0 ? true : false)
    }
  }

  const onPayments = async () => {
    // 바로 구매 버튼
    await fetcher('post', '/product/order', { username, orderItems: [{ quantity, itemId: product }] })
    navigate('/order')
  }

  const onCart = async () => {
    // 장바구니에 담기
    const cart = await fetcher('post', '/product/cart', { username, quantity, id, page: 'product' })

    // . 
    setMsg(true)
    setCartItem(cart.find(i => id === i.itemId).quantity)
    setQuantity(1)
  }

  useEffect(() => {
    getUserId()
    if (username === undefined) return
    getProduct()
  }, [id, username])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg(false)
    }, 2000)
    return () => { clearTimeout(timer) }
  }, [cartItem])

  const toggleLike = async (username, id) => {
    const res = await onLike(username, id)
    setIsLike(res)
  }

  const onMinusHandle = () => {
    if (quantity <= 1) return
    setQuantity((prev) => prev - 1)
  }
  return (
    <main>
      <Link to={'/product'}>
        Back
      </Link>
      {Object.keys(product).length !== 0 ?
        <>
          <IrTitle text={'상품 상세 페이지'} />
          <div className='product__detail-product-wrap'>
            <div className='product__detail-thumbnail'>
              <CenterImg src={product.productImage} alt={'상품 이미지'} />
            </div>
            <div className='product__detail-product-info-wrap'>
              <section className='product__detail-product-info'>
                {product.likes.length !== 0 ? <Text cls={'product__detail-like-message'} text={`${product.likes.length}명이 관심을 가지고 있어요`} /> : ""}
                {product.category !== '' ? <Text cls={'product__detail-category'} text={product.category} gray bold /> : ''}
                {/* <Text text={product?.owner.userName ||} /> */}
                <Title text={product.productName} />
                <Text text={product.address} gray bold />
                <Time year={product.year} month={product.month} date={product.date} cls={'product__cart_time'} />
                <div className='product__detail-description-wrap'>
                  <p className={'product__detail-description'} ref={txtRef}>
                    {product.productDescription}
                  </p>
                </div>
                <Text cls={'product__detail-price'} text={`${product.productPrice.toLocaleString('ko-KR')}원`} />
              </section>
              <section className='product__detail-price-section'>
                <div className='product__detail-price-wrap'>
                  <ProductQuantity quantity={quantity} onMinus={() => onMinusHandle()} onPlus={() => setQuantity(prev => prev + 1)} />
                  <div className='product__detail-quantity-price'>
                    <Text text={'총 금액'} gray />
                    <Text text={`${(quantity * product.productPrice).toLocaleString('ko-KR')}원`} bold />
                  </div>
                </div>
                <div className='product__detail-button-wrap'>
                  {msg ?
                    <div className='product__detail-cart-message'>
                      {/* <div className='product__detail-cart-bar' /> */}
                      <Text text={`장바구니에 ${cartItem}개 담겼습니다.`} color={'#ffffff'} />
                      <Link to={'/cart'}>
                        장바구니 확인
                      </Link>
                      <button onClick={() => setMsg(false)}>
                        닫기
                      </button>
                    </div>
                    : ''}
                  <button className={'product__detail-outline-button'} onClick={username !== "" ? () => toggleLike(username, id) : () => { alert('로그인이 필요합니다.') }} >
                    {!isLike ? '🤍 좋아요' : '❤️ 좋아요'}
                  </button>
                  <button className={'product__detail-outline-button'} onClick={username !== "" ? onCart : () => { alert('로그인이 필요합니다.') }}>
                    장바구니
                  </button>
                  <button className={'product__detail-fill-button'} onClick={username !== "" ? onPayments : () => { alert('로그인이 필요합니다.') }}>
                    바로구매
                  </button>
                </div>
              </section>
            </div>
            <section className='product_detail-event-section'>
              <Calendar year={product.year} month={product.month} date={product.date} schedule={product.schedule} />
              <div className={'product__detail-default-img'}>
                <CenterImg src={'https://plus.unsplash.com/premium_photo-1665952050581-4bf02bb5752e?q=80&w=2380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} padding={40} alt={'이미지'} />
              </div>
            </section>
            {/* 종료되는 일정이 하나라도 있어야 표시 */}
            {hasItem.length !== 0
              ?
              <section className='product_detail-mini-card-section'>
                <Title text={'곧 종료되는 일정'} gray />
                <div className='product_detail-mini-card-wrap'>
                  {hasItem.map(i => <MiniCard key={i._id} {...i} isLike={i.likes} />)}
                </div>
              </section>
              :
              ""
            }
          </div>
        </>
        : ''}
    </main>
  )
}

export default ProductDetail
