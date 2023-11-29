const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
const orderListModel = require('../models/orderListModel')
const findUser = require('../utils/findUser')

const product = async (req, res) => {
  const productList = await productModel.find({ schedule: { $gt: new Date() } })
  res.send(productList)
}

const productCreate = async (req, res) => {
  // 상품 생성
  const { username, productName, productDescription, productImage, productPrice, year, month, date, address } = req.body
  console.log(username, productName, productDescription, productImage, productPrice)
  if (!productName || !productDescription || !productPrice) {
    return console.log('필수 영역이 입력되지 않았음')
  }
  const targetUser = await userModel.findById(username)
  const newProduct = new productModel({ productName, owner: targetUser._id, productDescription, productImage, productPrice, year, month, date, address, schedule: new Date(year, month, date) })
  await newProduct.save()
  console.log(newProduct)
  res.send(newProduct)
}

const productDetail = async (req, res) => {
  const { id } = req.params
  const targetProduct = await productModel.findById(id).populate('owner')
  if (!targetProduct) return res.status(404).send('찾을 수 없는 페이지')
  const targetCategory = await productModel.find({ category: targetProduct.category, _id: { $nin: targetProduct._id }, schedule: { $gt: new Date() } }).sort({ createAt: -1 }).limit(4).skip()
  res.send({ targetProduct, targetCategory })
}

const cart = async (req, res) => {
  const { id, quantity, username, page } = req.body
  // console.log(id, quantity, username, page)
  if (quantity <= 0) return console.log('수량은 0개 이하로 입력할 수 없습니다.')
  const targetUser = await userModel.findById(username)
  const targetProduct = await productModel.findById(id)
  if (!targetUser) return console.log('로그인이 필요합니다.')

  const hasCart = targetUser.cartItems.findIndex(i => i.itemId.equals(id))

  if (hasCart >= 0) {
    const newCart = [...targetUser.cartItems]
    const newCartItem = page !== 'cart' ? ([...targetUser.cartItems][hasCart].quantity = [...targetUser.cartItems][hasCart].quantity + quantity) : ([...targetUser.cartItems][hasCart].quantity = quantity)

    // console.log(newCart)
    await targetUser.save()
    return res.json(targetUser.cartItems)
  } else {
    targetUser.cartItems.push({ itemId: id, quantity, checked: true })
    await targetUser.save()
    return res.json(targetUser.cartItems)
  }
}

const order = async (req, res) => {
  // 바로 구매, 선택 상품 구매, 전체 상품 구매 시 주문 생성
  const { username, orderItems } = req.body
  const orders = await orderModel.findOne({ username })
  if (!orders) {
    const newOrderItem = new orderModel({
      username, orderItems
    })
    await newOrderItem.save()
    return res.send(newOrderItem)
  } else {
    orders.orderItems = orderItems
    await orders.save()
    return res.send(orders)
  }
}

const payments = async (req, res) => {
  const { username, clientPrice } = req.body
  const orders = await orderModel.findOne({ username }).populate({
    path: 'orderItems.itemId'
  })
  const totalPrice = orders.orderItems.map(i => ({ quantity: i.quantity, productPrice: i.itemId.productPrice })).reduce((init, curr) => init + (curr.quantity * curr.productPrice), 0)

  if (clientPrice !== totalPrice) {
    return res.send({ status: 'failed' })
  }
  return res.send({ status: 'sucess' })
}

const likes = async (req, res) => {
  const { id, username } = req.body
  const targetUser = await userModel.findById(username)
  const targetProduct = await productModel.findById(id)
  if (!targetUser) return console.log('로그인이 필요합니다.')
  const hasLiked = targetUser.likes.findIndex(i => i.equals(id))
  const productLiked = targetUser.likes.findIndex(i => i.equals(username))


  if (hasLiked >= 0) {
    const newLiked = [...targetUser.likes]
    const newUserLike = [...targetProduct.likes]
    newLiked.splice(hasLiked, 1)
    newUserLike.splice(productLiked, 1)
    targetUser.likes = newLiked
    targetProduct.likes = newUserLike

    // console.log(newLiked)
    await targetUser.save()
    await targetProduct.save()
    return res.send(targetUser)
  }
  else {
    targetUser.likes.push(id)
    targetProduct.likes.push(id)
    // console.log(targetUser.likes)
    await targetUser.save()
    await targetProduct.save()
    return res.send(targetUser)
  }
}

const orderList = async (req, res) => {
  const { username } = req.body
  const user = await findUser(username)
  if (!user) return console.log('로그인이 필요합니다.')
  const orderList = await orderListModel.find({ username })
  console.log(orderList)
}

const userLikes = async (req, res) => {
  const { id } = req.params
  const userLike = await userModel.findById(id, { likes: 1 }).lean()
  // console.log(userLike)
  res.send(userLike)
}

const userCart = async (req, res) => {
  const { id } = req.params

  const user = await findUser(id)
  if (!user) return console.log('로그인이 필요합니다.')

  const cartItem = await userModel.findById(id, { cartItems: 1 }).populate('cartItems.itemId')
  const hasDeletedItem = cartItem.cartItems.findIndex(i => i.itemId === null)
  if (hasDeletedItem >= 0) {
    const filterItems = cartItem.cartItems.filter(i => i.itemId !== null).map(i => ({ quantity: i.quantity, itemId: i.itemId._id, checked: i.checked }))
    console.log(hasDeletedItem)

    const newItems = await userModel.findById(id, { cartItems: 1 })
    newItems.cartItems = filterItems
    await newItems.save()
    await newItems.populate('cartItems.itemId')
    return res.send(newItems)
  }

  res.send(cartItem)
}

const deleteCart = async (req, res) => {
  const { username, id } = req.body
  const user = await userModel.findById(username, { cartItems: -1 })
  if (!user) return console.log('로그인이 필요합니다.')
  const deleteItem = user.cartItems.findIndex(i => i.itemId.equals(id))

  if (deleteItem < 0) return
  const newCartList = [...user.cartItems]
  newCartList.splice(deleteItem, 1)
  user.cartItems = newCartList

  await user.save()
  const newCartItem = await user.populate('cartItems.itemId')
  console.log(newCartItem)
  res.send(user.cartItems)
}

const checkedCart = async (req, res) => {
  const { username, checked, id } = req.body

  const user = await findUser(username)
  if (!user) return console.log('로그인이 필요합니다.')

  const checkedCartItem = user.cartItems.findIndex(i => i.itemId.equals(id))

  if (checkedCartItem < 0) return console.log('없는 상품입니다.')
  const newCart = [...user.cartItems][checkedCartItem].checked = checked
  await user.save()
  res.send(user)
}

const userOrder = async (req, res) => {
  const { id } = req.params
  const targetOrder = await orderModel.findOne({ username: id }, { orderItems: 1 }).populate('orderItems.itemId')
  if (!targetOrder) return console.log('주문 내역이 존재하지 않습니다.')
  res.send(targetOrder)
}

const orderSuccessfully = async (req, res) => {
  const { username, items } = req.body
  const orderItems = items.map(i => ({ quantity: i.quantity, itemId: i.itemId._id }))

  const newOrderList = new orderListModel({ username, orderItems })
  await newOrderList.save()

  const initOrder = await orderModel.findOne({ username })
  initOrder.orderItems = []
  await initOrder.save()

  const initCart = await userModel.findById(username)
  initCart.cartItems = []
  await initCart.save()

  res.send(newOrderList)
}

const userOrderSuccessfully = async (req, res) => {
  const { id } = req.params
  const recentOrder = await orderListModel.find({ username: id }).sort({ createdAt: -1 }).limit(1).populate('orderItems.itemId')
  res.send(Object(...recentOrder))
}


module.exports = { product, productDetail, payments, productCreate, likes, cart, order, orderList, userLikes, userCart, deleteCart, checkedCart, userOrder, orderSuccessfully, userOrderSuccessfully }