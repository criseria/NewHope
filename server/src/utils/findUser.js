const userModel = require('../models/userModel')

const findUser = async (id) => {
  const targetUser = await userModel.findById(id)
  if (!targetUser) return null
  return targetUser
}

module.exports = findUser