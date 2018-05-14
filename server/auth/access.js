const router = require('express').Router();
const { User, UserAccess } = require('../db/models');

module.exports = router;

router.post('/', (req, res, next) => {
  const { token } = req.body;
  if (!token) res.sendStatus(400);
  else {
    UserAccess.find({ where: { token } })
      .then((accessObj) => {
        if (!accessObj) res.sendStatus(400);
        if (accessObj.action === 'activate_account') {
          User.findById(accessObj.userId)
            .then(user => user.update({ activated: true }))
            .then(user => UserAccess.destroy({ where: { userId: user.id } }))
            .then(_ => res.send('activated')); // eslint-disable-line
        }
      })
      .catch(next);
  }
});

// router.post('/reset', (req, res, next) => {
//   const { token } = req.body;
//   if (!token) res.sendStatus(400);
//   UserAccess.find({ where: { token } })
//     .then((accessObj) => {

//     });
// });
