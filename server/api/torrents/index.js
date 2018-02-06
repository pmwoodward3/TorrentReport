const router = require('express').Router();

module.exports = router;

router.use('/sites', require('./sites'));
router.use('/groups', require('./groups'));
router.use('/infos', require('./infos'));
router.use('/listings', require('./listings'));
router.use('/snapshots', require('./snapshots'));
router.use('/stats', require('./stats'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
