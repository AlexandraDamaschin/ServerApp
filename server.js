const passport = require('passport');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// Set port on 8080 for Heroku
const port = process.env.PORT || 8080; // Alexandra Damaschin S00175680
// Database
const config = require('./config/database');

// Routes
const productRoutes = require('./api/routes/productRoutes'); // Daniel O'Regan S00112276
const userRoutes = require('./api/routes/userRoutes'); // Alexandra Damaschin S00175680
const transactionRoutes = require('./api/routes/transactionRoutes'); //Sophia Price S00160641

// Models
const productModel = require('./api/models/productModel'); // Daniel O'Regan S00112276
const transactionModel = require('./api/models/transactionModel'); // Alexandra Damaschin S00175680

// Connect to db
mongoose.connect(config.database);// 

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', userRoutes);

transactionRoutes(app);
productRoutes(app); // Daniel O'Regan S00112276

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});