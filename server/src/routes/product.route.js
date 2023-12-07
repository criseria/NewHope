const express = require('express');
const { product, payments, userOrder, orderSuccessfully, checkedCart, userCart, orderList, deleteCart, productDetail, userLikes, productCreate, likes, cart, order, userOrderSuccessfully, getOid, productDelete } = require('../controllers/product.controller');
const { oid, bodyOid } = require('../middlewares/objectIdCheck')
const productModel = require('../models/productModel')

const router = express.Router()

router.get('/', product)
router.get('/:id', oid, productDetail);
router.get('/likes/:id', userLikes);
router.get('/cart/:id', userCart);
router.get('/order/:id', oid, userOrder)
router.get('/ordersuccessfully/:id', userOrderSuccessfully)
router.get('/get/oid', getOid)

router.post('/create', productCreate);
router.post('/likes', likes);
router.post('/cart', cart);
router.post('/order', order);
router.post('/payments', payments);
router.post('/ordersuccessfully', orderSuccessfully)
router.post('/orderlist', orderList);

router.put('/cart', deleteCart)
router.patch('/cart', checkedCart)

router.delete('/:id', productDelete)

// router.get('/m/allProduct', async (req, res) => {
//   const product = await productModel.find({})
//   console.log(product.length)
//   for (let index = 0; index < product.length; index++) {
//     const id = product[index]._id
//     const targetProduct = await productModel.findById(id, { year: 1, month: 1, date: 1 })
//     const { year, month, date } = targetProduct

//     targetProduct.schedule = new Date(year, month - 1, date)
//     await targetProduct.save()
//   }
//   res.send(product)
// })
module.exports = router

// const product = ['/create','/likes','/cart']