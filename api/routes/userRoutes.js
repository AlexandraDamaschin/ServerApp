const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const User = require('../models/userModel');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        zip: req.body.zip
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user!' });
        }
        else {
            res.json({ success: true, msg: 'User registered!' });
        }
    });
});

// Auth
router.post('/authenticate', (req, res, next) => {
    // user auth by email 
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'Email not found. Please register first!' })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 86400 // 1 day in seconds
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        address: user.address,
                        city: user.city,
                        country: user.country,
                        zip: user.zip
                    }
                });
            }
            else {
                return res.json({ success: false, msg: 'Wrong password!' });
            }
        });
    });
});

//profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // console.log(req.username);
    res.send({
        user: req.user,
        username: req.username,
        email: req.email,
        address: req.address,
        city: req.city,
        country: req.country,
        zip: req.zip
    });
});

module.exports = router;