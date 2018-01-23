const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

const parse = require('./parse/tpb')()

router.get('/', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    res.json(parse)
  } else {
    next()
  }
})
