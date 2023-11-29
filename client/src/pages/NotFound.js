import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router';
import { fetcher } from '../utils/fetcher'
import Text from '../components/text/Text';
import Title from '../components/text/Title';
import IrTitle from '../components/text/IrTitle';
import IrText from '../components/text/IrText';
import Calendar from '../components/calendar/Calendar';
import useLogin from '../hooks/useLogin'
import CenterImg from '../components/image/CenterImg'
import Container from '../components/container/Container'
import { Link } from 'react-router-dom'
import ProductQuantity from '../components/ProductQuantity'

const NotFound = () => {
  const { id } = useParams()

  const username = '65532d5338822ee4fb08f2ad'
  const hasLogin = useLogin()
  const txtRef = useRef(null)
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isLike, setIsLike] = useState(false)
  const [product, setProduct] = useState({})
  const getProduct = async () => {
    // if (id.replace(/[^0-9,a-f]/g, '').length !== 24) {
    //   return navigate('/')
    // }
    const product = await fetcher('get', `/product/${id}`)
    setProduct(product)

    if (username !== '') {
      const users = await fetcher('get', `/product/likes/${username}`)
      setIsLike(users.likes.findIndex(i => i === id) >= 0 ? true : false)
    }
  }

  const onChangeHandle = (e) => {
    setQuantity(parseInt(e.target.value.replace(/[^0-9]/g, '')))
  }

  const onPayments = async () => {
    const payments = await fetcher('post', '/product/likes', { username, quantity })
  }

  const onCart = async () => {
    const cart = await fetcher('post', '/product/cart', { username, quantity, id, page: 'product' })
  }

  const onLike = async () => {
    const like = await fetcher('post', '/product/likes', { username, id })
    const res = like.likes.findIndex(i => i === id)
    setIsLike(res >= 0, true, false)
  }
  console.log(isLike)
  // useEffect(() => {
  //   getProduct()
  // }, [id])

  return (
    <main>
      존재하지 않는 페이지
    </main>
  )
}

export default NotFound
