const router = require('express').Router();

const user = require('./../handlers/user');

router
    .get('/', user.onGetAllUsers)
    .post('/', () => { })
    .get('/:id', () => { })
    .delete('/:id', () => { })

module.exports = router;
