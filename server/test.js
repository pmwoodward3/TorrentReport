const router = require('express').Router();
const reporterAgent = require('./reporterAgent');

module.exports = router;

router.get('/', (req, res, next) => {
  reporterAgent()
    .then(data => res.json(data))
    .catch(next);
});
