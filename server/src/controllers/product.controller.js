const productModel = require('../models/userModel')

const product = async (req, res) => {
  // const prodcutList = await productModel.find({})
  res.send('send')
}

const productDetail = async (req, res) => {
  const { id } = req.params
  // const targetProdcut = await productModel.findById(id)
  console.log(`${id}+end`)
  res.send(`${id}+end`)
}

module.exports = { product, productDetail }