const router = require('express').Router();

const chatRoom = require('./../handlers/chatRoom');

router
.get('/', chatRoom.getRecentConversation)
.get('/:roomId', chatRoom.getConversationByRoomId)
.post('/initiate', chatRoom.initiate)
.post('/:roomId/message', chatRoom.postMessage)
.put('/:roomId/mark-read', chatRoom.markConversationReadByRoomId)

module.exports = router;
