const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb+srv://teeny:1234@cluster0.wfben.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);
let usersCollection;

async function connectToDatabase() {
    await client.connect();
    const database = client.db('userDB');
    usersCollection = database.collection('users');
}

connectToDatabase().catch(console.error);

// Registration endpoint
app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    const userExists = await usersCollection.findOne({ username: username });
    if (userExists) {
        return res.status(400).json({ message: 'Username already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({ email, username, password: hashedPassword });
    res.status(201).json({ message: 'Registered Successfully!' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await usersCollection.findOne({ username: username });
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ message: 'Login Successfully!' });
    } else {
        res.status(401).json({ message: 'Invalid username or password.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at https://urban-tribble-5ggp94qwvvq5fvxj-3000.app.github.dev:${port}`);
});