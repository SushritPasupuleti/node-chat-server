const makeValidation = require('@withvoid/make-validation');

const db = require('./../models/');

exports.deleteRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await db.ChatRoom.remove({ _id: roomId });
        const messages = await db.ChatMessage.remove({ chatRoomId: roomId })
        return res.status(200).json({
            success: true,
            message: "Operation performed succesfully",
            deletedRoomsCount: room.deletedCount,
            deletedMessagesCount: messages.deletedCount,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}

exports.deleteMessageById = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await db.ChatMessage.remove({ _id: messageId });
        return res.status(200).json({
            success: true,
            deletedMessagesCount: message.deletedCount,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
}