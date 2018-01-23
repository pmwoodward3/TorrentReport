const router = require('express').Router()
const { User } = require('../db/models')
const scrape = require('./parse/tpb')
module.exports = router

router.get('/', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    scrape()
      .then(data => res.json(data))
      .catch(next)
  } else {
    next()
  }
})
