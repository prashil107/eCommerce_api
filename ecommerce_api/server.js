require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require("path");
const fs = require('fs'); // Import the file system module

const app = express();
connectDB(); // Ensure MongoDB is connected

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "home.html"), 'utf8', (err, html) => { //changed index.html to home.html
        if (err) {
            console.error("Error reading home.html:", err); // Added error logging
            return res.status(500).send('Error loading home.html');
        }
        res.send(html);
    });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));