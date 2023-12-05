import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router';
import { fetcher } from '../utils/fetcher'
import IrTitle from '../components/text/IrTitle';
import IrText from '../components/text/IrText';
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'
import Text from '../components/text/Text'
import CartItem from '../components/CartItem'
import OrderConatiner from '../components/container/OrderContainer'
import FixedModal from '../components/modal/FixedModal'
import { useUserId } from '../hooks/useUserId'

import './cart.css'

const Cart = () => {
  const hasLogin = useLogin()
  const txtRef = useRef(null)
  const cartRef = useRef(null)
  const navigate = useNavigate()
  const [isNum, setIsNum] = useState(1)
  const [cartItem, setCartItem] = useState([])
  const [deleteMsg, setDeleteMsg] = useState({ view: false, array: false })
  const [removeId, setRemoveId] = useState('')
  const [hasAll, setHasAll] = useState(false)
  const filterItem = cartItem.filter(i => i.checked === true)
  const filterItemPrice = filterItem.reduce((init, curr) => init + (curr.quantity * curr.itemId.productPrice), 0)
  const { username, getUserId } = useUserId()

  const getProduct = async () => {
    const res = await fetcher('get', `/product/cart/${username}`)
    setCartItem(res.cartItems)

    if (res.cartItems.findIndex(i => i.checked === false) >= 0) {
      return setHasAll(false)
    }
    setHasAll(true)
  }

  useEffect(() => {
    getUserId()
    if (username === undefined) return
    if (username === '') { return navigate('/login') }
    getProduct()
  }, [username])

  const onMinusHanlde = async (id) => {
    const targetItem = cartItem.findIndex(i => i.itemId._id === id)
    if (targetItem < 0) return
    const newQuantity = { ...cartItem[targetItem], quantity: cartItem[targetItem].quantity - 1 }

    if (newQuantity.quantity <= 0) return
    const newList = [...cartItem]
    newList.splice(targetItem, 1, newQuantity)
    setCartItem(newList)

    await fetcher('post', '/product/cart', { username, id, quantity: newQuantity.quantity, page: 'cart' })
  }

  const onPlusHandle = async (id) => {
    const targetItem = cartItem.findIndex(i => i.itemId._id === id)
    if (targetItem < 0) return
    const newQuantity = { ...cartItem[targetItem], quantity: cartItem[targetItem].quantity + 1 }

    const newList = [...cartItem]
    newList.splice(targetItem, 1, newQuantity)
    setCartItem(newList)

    await fetcher('post', '/product/cart', { username, id, quantity: newQuantity.quantity, page: 'cart' })
  }

  const deleteItem = useCallback((id = '', array = false) => {
    setDeleteMsg({ view: true, array: array })
    setRemoveId(id)
  }, [removeId, deleteMsg])

  const onRemoveHandle = async (id) => {

    // 상품 삭제
    const targetItem = await cartItem.findIndex(i => i.itemId._id === id)
    if (targetItem < 0) return
    // const newList = [...cartItem]
    // newList.splice(targetItem, 1)
    setDeleteMsg(false)

    const res = await fetcher('put', '/product/cart', { username, id })
    setCartItem(res)
  }

  const onRemoveCancelHandle = () => {
    setDeleteMsg(false)
    setRemoveId('')
  }

  const onCheckHandle = async (id) => {
    // 상품 선택, 상품 선택 해제
    const targetItem = cartItem.findIndex(i => i.itemId._id === id)
    if (targetItem < 0) return
    const newChecked = { ...cartItem[targetItem], checked: !cartItem[targetItem].checked }

    const newList = [...cartItem]
    newList.splice(targetItem, 1, newChecked)
    setCartItem(newList)

    await fetcher('patch', '/product/cart', { username, id, checked: newChecked.checked })
  }

  const selectedItems = async () => {
    // 선택 상품만 구매
    const checkItems = cartItem.filter(i => i.checked === true)
    if (checkItems.length === 0) return console.log('선택 상품이 없습니다.')

    await fetcher('post', '/product/order', { username, orderItems: checkItems })
    navigate('/order')
  }

  const allItems = async () => {
    // 전체 상품 구매
    await fetcher('post', '/product/order', { username, orderItems: cartItem })
    navigate('/order')
  }

  const allCheck = () => {
    const allCartItem = cartItem.map(i => ({ ...i, checked: !hasAll }))
    setCartItem(allCartItem)
  }

  const selectRemove = async () => {
    const checkItems = cartItem.filter(i => i.checked === true).map(i => i.itemId._id)
    if (checkItems.length === 0) return console.log('선택 상품이 없습니다.')

    for (let i = 0; i < checkItems.length; i++) {
      await onRemoveHandle(checkItems[i])
    }
  }

  useEffect(() => {
    if (cartItem.findIndex(i => i.checked === false) >= 0) {
      return setHasAll(false)
    }
    setHasAll(true)
  },
    [cartItem])

  return (
    <main style={{ paddingBottom: `${cartRef.current?.clientHeight || 0}px` }}>
      <OrderConatiner>
        <Link to={'/product'}>
          Back
        </Link>
        {cartItem.length !== 0 ?
          <>
            <IrTitle text={'상품 상세 페이지'} />
            <div className='cart__cart-list'>
              <div className='cart__cart-list-option'>
                <button className='cart__cart-all-check-button' onClick={allCheck}>
                  <img src={hasAll ? '/check.png' : '/check_outline.png'} />
                  <span>
                    전체 선택
                  </span>
                </button>
                <button className='cart__cart-all-check-button' onClick={() => deleteItem('', true)}>
                  <span>
                    선택 상품 삭제
                  </span>
                </button>
              </div>
              <div className='cart__cart-item-wrap'>
                {cartItem.map(i =>
                  <CartItem key={i._id} {...i}
                    cart
                    onCheckHandle={() => onCheckHandle(i.itemId._id)}
                    onMinusHandle={() => onMinusHanlde(i.itemId._id)}
                    onPlusHandle={() => onPlusHandle(i.itemId._id)}
                    deleteItem={() => deleteItem(i.itemId._id)}
                  />
                )}
              </div>
              <div className={'cart__all-item-button-wrap'}>
                <div className={'cart__all-item-button-info'}>
                  <Text text={'전체 상품 금액'} cls={'cart__all-item-button-text'} small />
                  <span className={'cart__all-item-button-price'}>
                    {`${cartItem.reduce((init, curr) => init + (curr.quantity * curr.itemId.productPrice), 0).toLocaleString('ko-KR')}원`}
                  </span>
                </div>
                <button className={'cart__all-item-button'}
                  onClick={allItems}>
                  전체 상품 주문하기
              </button>
              </div>
            </div>
            <div ref={cartRef} className={'cart__selected-item-button-section'}>
              {<div className={'cart__selected-item-button-wrap'}>
                <div className={'cart__selected-item-button-info'}>
                  <Text text={'선택 상품 금액'} cls={'cart__selected-item-button-text'} />
                  <span className={'cart__selected-item-button-price'}>
                    {`${filterItemPrice.toLocaleString('ko-KR')}원`}
                  </span>
                </div>
                <button className={'cart__selected-item-button'}
                  onClick={selectedItems}>
                  <span>
                    {filterItem.length}
                  </span>
                개 상품 주문하기
              </button>
              </div>}
            </div>
          </>
          : '장바구니가 비었습니다.'}
      </OrderConatiner>
      {
        deleteMsg.view ?
          <FixedModal text={!deleteMsg.array ? '해당 상품을 삭제하시겠습니까?' : '선택 상품을 삭제하시겠습니까?'}
            action={!deleteMsg.array ? () => onRemoveHandle(removeId) : () => selectRemove()} secondaryAction={onRemoveCancelHandle}
            actionLabel={'삭제'} secondaryLabel={'취소'}
            btn_cls={'cart__delete-btn'} secondary_btn_cls={'cart__cancel-btn'} />
          : ""
      }
    </main >
  )
}

export default Cart
