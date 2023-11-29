import { useState, useEffect } from 'react'
import { fetcher } from '../utils/fetcher'
import OrderContainer from '../components/container/OrderContainer'
import CartItem from '../components/CartItem'
import Title from '../components/text/Title'
import { Link } from 'react-router-dom'

const OrderSucessfully = () => {
  const [orderList, setOrderList] = useState({})
  const username = '6554b0620567c42fd1c5c405'

  const getOrder = async () => {
    const res = await fetcher('get', `/product/ordersuccessfully/${username}`)
    setOrderList(res)
  }

  useEffect(() => {
    getOrder()
  }, [])

  const orderLength = orderList.orderItems?.length
  return (
    <main>
      <OrderContainer>
        {Object.keys(orderList).length !== 0 ?
          <div className='cart__cart-list'>
            <Title text={'구매가 완료돠었습니다.'} cls={'order__order-title'} />
            <Title text={`${orderList.orderItems[0].itemId.productName}${orderLength > 1 ? ` 외 ${orderLength - 1}개` : ''}`} tag={'h3'} cls={'order__order-sub-title'} />
            {Object.keys(orderList).length !== 0 ?
              <div className='cart__cart-item-wrap'>
                {orderList.orderItems.map(i =>
                  <CartItem key={i._id} {...i} />
                )}
              </div> : ''}
            <div className='order__success-home-button-wrap'>
              <Link className='order__success-home-button' to='/'>
                홈으로 이동
            </Link>
            </div>
          </div> : ""}
      </OrderContainer>
    </main>
  )
}

export default OrderSucessfully
