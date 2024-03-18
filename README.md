# Express Message API

This is a simple Express.js API for storing and retrieving messages. It uses MongoDB for storage and supports basic CRUD operations.

## Features

- Store messages with a name, email, and message content.
- Retrieve messages with pagination.
- Update message likes and dislikes.
- Count total number of messages.

## Setup
1. Install the dependencies:
```bash
npm install
```
2. Create a .env file in the root directory and add your MongoDB connection string:
```bash
MONGODB_URI=mongodb://*yourhost*/db_coder_arts_demo
```
3. Start the server:
```bash
node .
```
API Endpoints
- POST /msg/post: Create a new message. The request body should be a JSON object with name, email, and message properties.

- PUT /msg/:id: Update a message's likes or dislikes. The request body should be a JSON object with an action property, which can be either 'like' or 'dislike'.

- GET /msg/get: Retrieve messages. Supports pagination through page and pageSize query parameters.

- GET /msg/pages: Get the total number of messages.
