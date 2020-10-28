const router = require('express').Router();

const { encode } = require('./../middlewares/jwt');

router
  .post('/login/:userId', encode, (req, res, next) => {
    return res
      .status(200)
      .json({
        success: true,
        authorization: req.authToken,
      });
  });

module.exports = router;