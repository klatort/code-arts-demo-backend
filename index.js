const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB');
});

const Schema = mongoose.Schema;
const messageSchema = new Schema({
    name: String,
    email: String,
    message: String,
    likes: Number,
    dislikes: Number,
    date: Date
});

const Message = mongoose.model('Message', messageSchema);

app.post('/msg/post', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const msg = new Message({
            name,
            email,
            message,
            likes: 0,
            dislikes: 0,
            date: new Date()
        });
        
        const result = await msg.save();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/msg/:id', async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;

    try {
        const message = await Message.findById(id);

        if (!message) {
            console.log('Message not found')
            return res.status(404).json({ error: 'Message not found' });
        }

        if (action === 'like') {
            message.likes++;
        } else if (action === 'dislike') {
            message.dislikes++;
        } else {
            console.log(action);
            return res.status(400).json({ error: 'Invalid action' });
        }

        const updatedMessage = await message.save();
        res.json(updatedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/msg/get', async (req, res) => {
    try {
        const { page, pageSize } = req.query;
        const skip = page * pageSize;
        const messages = await Message.find().sort({ date: -1 }).skip(skip).limit(pageSize);
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/msg/pages', async (req, res) => {
    try {
        const totalMessages = await Message.countDocuments();;
        res.json({ totalMessages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => console.log('Server started ok!'));