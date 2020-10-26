const express = require('express');
// controllers
const users = ('../controllers/delete.js');

const router = express.Router();

router
  .delete('/room/:roomId', deleteController.deleteRoomById)
  .delete('/message/:messageId', deleteController.deleteMessageById)

  module.exports.deleteRouter;