import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import { fetcher } from '../utils/fetcher'
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import IrTitle from '../components/text/IrTitle';
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import OrderContainer from '../components/container/OrderContainer'
import { useUserId } from '../hooks/useUserId'
import useMyPageData from '../hooks/useMypage'

import './cart.css'
const Order = () => {
  const { username, getUserId } = useUserId()
  const { userName, userEmail, userPostcode, userAddress, userDetailAddress, userPhoneNum } = useMyPageData();

  const buyer_name = '테스트'
  const buyer_tel = '01000000000'
  const buyer_email = 'buyer_email'

  const hasLogin = useLogin()
  const navigate = useNavigate()
  const [isNum, setIsNum] = useState(1)
  const [cartItem, setCartItem] = useState([])
  const getProduct = async () => {
    const res = await fetcher('get', `/product/order/${username}`)
    if (res.orderItems.length === 0) {
      alert('구매 가능한 상품이 없어 홈으로 이동합니다.')
      return navigate('/')
    }
    setCartItem(res.orderItems)
  }

  useEffect(() => {
    getUserId()
    if (username === undefined) return
    if (username === '') { return navigate('/login') }
    getProduct()
  }, [username])

  const amount = cartItem.reduce((init, curr) => init + (curr.quantity * curr.itemId.productPrice), 0)

  const paymentHandler = async (pg, amount) => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_SELLER_CODE); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    // PG사 코드표
    // https://developers.portone.io/docs/ko/tip/pg-2?v=v1
    const data = {
      pg, // PG사 코드표 참조
      pay_method: "card",
      // 주문번호는 결제창 요청 시 항상 고유 값으로 채번 되어야 합니다.
      // 결제 완료 이후 결제 위변조 대사 작업시 주문번호를 이용하여 검증이 필요하므로 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB 상에 저장해주세요
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount, // 결제 금액
      name: `${cartItem[0].itemId.productName}${cartItem.length === 1 ? '' : ` 외 ${cartItem.length - 1}건`}`, //주문명
      buyer_tel,
      buyer_email,
      buyer_name,
      buyer_addr: '신사동 661-16',                    // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
      m_redirect_url: '/'
      // notice_url: "http://localhost:3002/api/payments/webhook",
    };

    const res = await fetcher('post', '/product/payments', { username, clientPrice: amount })
    if (res.status === 'failed') {
      alert('금액이 일치하지 않습니다.')
      return navigate('/')
    }

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  async function callback(rsp) {
    const { success, error_msg, merchant_uid, imp_uid } = rsp;

    if (success) {
      await fetcher('post', '/product/ordersuccessfully', { username, items: cartItem })
      navigate('/ordersuccessfully')
    } else {
      alert(`결제 실패: ${error_msg}`);
      navigate('/')
    }
  }

  return (
    <main>
      <OrderContainer>
        <Link to={'/product'}>
          Back
        </Link>
        {cartItem.length !== 0 ?
          <>
            <IrTitle text={'주문 페이지'} />
            <div className='cart__cart-list'>
              <Title cls={'order__order-title'}
                text={`${cartItem[0].itemId.productName}${cartItem.length === 1 ? '' : ` 외 ${cartItem.length - 1}건`}`} />
              <div className='cart__cart-item-wrap'>
                {cartItem.map(i =>
                  <CartItem key={i._id} {...i} />
                )}
              </div>
              <section className={`order__order-payment-wrap`}>
                <div className={'order__order-price'}>
                  <Text text={`총 결제 금액`} />
                  <Text text={`${amount.toLocaleString('ko-KR')}원`} />
                </div>
                <div className={`order__order_payment_button`}>
                  <button style={{ color: '#191919', boxShadow: '0 0 2px #191919' }} onClick={() => paymentHandler('kakaopay', amount)}>
                    {/* <img src={'/kakao.png'} /> */}
                    카카오페이
                  </button>
                  <button style={{ color: '#0064FF', boxShadow: '0 0 2px #0064FF' }} onClick={() => paymentHandler('tosspay', amount)}>
                    {/* <img src={'/toss_white.png'} /> */}
                    토스페이
                  </button>
                  <button style={{ color: '#ff0064', boxShadow: '0 0 2px #ff0064' }} onClick={() => paymentHandler('html5_inicis', amount)}>
                    카드결제
                  </button>
                </div>
              </section>
            </div>
          </>
          : '구매 가능한 상품이 없습니다.'}
      </OrderContainer>
    </main>
  )
}

export default Order
