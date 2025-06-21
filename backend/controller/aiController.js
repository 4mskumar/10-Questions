import generateContent from "../service/ai.js";
import { v4 as uuidv4 } from 'uuid';
import ChatSession from "../models/chat.js";

export const getRevert = async (req, res) => {
    const { userId, email, message } = req.body;
    try {
        let session = await ChatSession.findOne({userId}).sort({createdAt: -1})
        if(!session || session.chat.length >= 10) {
            session = new ChatSession({
                email,
                userId,
                sessionId: uuidv4(),
                chat: []
            })
        }

        session.chat.push({role: "user", content: message})
        const response = await generateContent(session.chat);
        session.chat.push({role: 'ai', content: response})
        await session.save()
        res.status(200).json({ response });
    } catch (error) {
        console.error("AI Error:", error.message, error.stack);
    res.status(500).json({ error: 'Failed to handle message', details: error.message });
    }
}
// Im kanika how are you chat
// whats my name