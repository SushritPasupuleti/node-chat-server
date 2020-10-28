const router = require('express').Router();

const deleteHandler = require('./../handlers/delete');

router
    .delete('/room/:roomId', deleteHandler.deleteRoomById)
    .delete('/message/:messageId', deleteHandler.deleteMessageById)

module.exports = router;
