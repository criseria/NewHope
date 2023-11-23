const express = require('express')
const authRoute = require('./auth.route')
const anmalRoute = require('./animal.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/animal', anmalRoute)

module.exports = router