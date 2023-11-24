const express = require('express')
const authRoute = require('./auth.route')
const anmalRoute = require('./animal.route')
const boardRoute = require('./board.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/animal', anmalRoute)
router.use('/board', boardRoute)

module.exports = router