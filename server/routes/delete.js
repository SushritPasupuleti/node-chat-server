const router = require('express').Router();

router
    .delete('/room/:roomId', () => { })
    .delete('/message/:messageId', () => { })

module.exports = router;
