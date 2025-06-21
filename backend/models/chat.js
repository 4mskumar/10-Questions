import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const chatSessionSchema = new mongoose.Schema({
    email: String,
    userId: String,
    sessionId: String,
    chat: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const ChatSession = mongoose.model('ChatSession', chatSessionSchema)
export default ChatSession;