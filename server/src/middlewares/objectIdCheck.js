const mongoose = require('mongoose')

const oid = (req, res, next) => {
  const { ObjectId } = mongoose.Types
  const { id } = req.params
  if (!ObjectId.isValid(id)) {
    console.log('해당 페이지가 존재하지 않음')
    return res.send({ status: 'failed' })
  }
  next()
}

const bodyOid = (req, res, next) => {
  const { ObjectId } = mongoose.Types
  const { username } = req.body

  if (!ObjectId.isValid(username)) return res.status(404).send({ message: '해당 페이지가 존재하지 않습니다.' })
  next()
}

module.exports = { oid, bodyOid }