const makeValidation = require('@withvoid/make-validation');

const db = require('./../models/');

exports.initiate = async (req, res) => {
    try {
        const validation = makeValidation(types => ({
            payload: req.body,
            checks: {
                userIds: {
                    type: types.array,
                    options: { unique: true, empty: false, stringOnly: true }
                },
                type: { type: types.enum, options: { enum: db.CHAT_ROOM_TYPES } },
            }
        }));
        if (!validation.success) return res.status(400).json({ ...validation });

        const { userIds, type } = req.body;
        const { userId: chatInitiator } = req;
        const allUserIds = [...userIds, chatInitiator];
        const chatRoom = await db.ChatRoom.initiateChat(allUserIds, type, chatInitiator);
        return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.postMessage = async (req, res) => {
    try {
        const { roomId } = req.params;
        const validation = makeValidation(types => ({
            payload: req.body,
            checks: {
                messageText: { type: types.string },
            }
        }));
        if (!validation.success) return res.status(400).json({ ...validation });

        const messagePayload = {
            messageText: req.body.messageText,
        };
        const currentLoggedUser = req.userId;
        const post = await db.ChatMessage.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
        global.io.sockets.in(roomId).emit('new message', { message: post });
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.getRecentConversation = async (req, res) => {
    try {
        const currentLoggedUser = req.userId;
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        };
        const rooms = await db.ChatRoom.getChatRoomsByUserId(currentLoggedUser);
        const roomIds = rooms.map(room => room._id);
        const recentConversation = await db.ChatMessage.getRecentConversation(
            roomIds, options, currentLoggedUser
        );
        return res.status(200).json({ success: true, conversation: recentConversation });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.getConversationByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await db.ChatRoom.getChatRoomByRoomId(roomId)
        if (!room) {
            return res.status(400).json({
                success: false,
                message: 'No room exists for this id',
            })
        }
        const users = await db.User.getUserByIds(room.userIds);
        const options = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        };
        const conversation = await db.ChatMessage.getConversationByRoomId(roomId, options);
        return res.status(200).json({
            success: true,
            conversation,
            users,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error });
    }
}

exports.markConversationReadByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await db.ChatRoom.getChatRoomByRoomId(roomId)
        if (!room) {
            return res.status(400).json({
                success: false,
                message: 'No room exists for this id',
            })
        }

        const currentLoggedUser = req.userId;
        const result = await db.ChatMessage.markMessageRead(roomId, currentLoggedUser);
        return res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error });
    }
}