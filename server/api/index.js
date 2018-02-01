const router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/torrents', require('./torrents'));
router.use('/test', require('./test'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
