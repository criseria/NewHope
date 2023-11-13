const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

const product = async (req, res) => {
  const productList = await productModel.find({})
  res.send(productList)
}

const productCreate = async (req, res) => {
  const { username, productName, productDescription, productImage, productPrice } = req.body
  console.log(username, productName, productDescription, productImage, productPrice)
  if (!productName || !productDescription || !productPrice) {
    console.log('필수 영역이 입력되지 않았음')
  }
  const targetUser = await userModel.findById(username)
  const newProduct = new productModel({ productName, owner: targetUser._id, productDescription, productImage, productPrice })
  await newProduct.save()
  console.log(newProduct)
}

const productDetail = async (req, res) => {
  const { id } = req.params
  const targetProduct = await productModel.findById(id).populate('owner')
  if (!targetProduct) return res.status(404).send('찾을 수 없는 페이지')
  console.log(targetProduct)
  res.send(targetProduct)
}

const likes = async (req, res) => {
  const { id, amount, username } = req.body
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

    console.log(newLiked)
    await targetUser.save()
    await targetProduct.save()
    return res.send(targetUser)
  }
  else {
    targetUser.likes.push(id)
    targetProduct.likes.push(id)
    console.log(targetUser.likes)
    await targetUser.save()
    await targetProduct.save()
    return res.send(targetUser)
  }

}

module.exports = { product, productDetail, productCreate, likes }