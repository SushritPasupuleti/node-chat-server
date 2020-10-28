const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const CHAT_ROOM_TYPES = {
    CONSUMER_TO_CONSUMER: "consumer-to-consumer",
    CONSUMER_TO_SUPPORT: "consumer-to-support",
};

const chatRoomSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => uuidv4().replace(/\-/g, ""),
        },
        userIds: Array,
        type: String,
        chatInitiator: String,
    },
    {
        timestamps: true,
        collection: "chatrooms",
    }
);

module.exports = mongoose.model("Chatroom", chatRoomSchema);
module.exports.CHAT_ROOM_TYPES = CHAT_ROOM_TYPES;