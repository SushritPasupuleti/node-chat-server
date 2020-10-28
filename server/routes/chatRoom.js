const router = require('express').Router();

router
.get('/', () => {})
.get('/:roomId', () => {})
.post('/initiate', () => {})
.post('/:roomId/message', () => {})
.put('/:roomId/mark-read', () => {})

module.exports = router;
