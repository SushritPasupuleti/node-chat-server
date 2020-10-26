const express = require('express');
const { model } = require('mongoose');
// controllers
const users = ('../controllers/user.js');
// middlewares
const { encode } = require('../middlewares/jwt.js');

const router = express.Router();

router
    .post('/login/:userId', encode, (req, res, next) => { });

module.exports.Router = router;