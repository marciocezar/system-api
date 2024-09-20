const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    try {
        const { username, loginuser, password } = req.body;
        const existingUser = await User.findOne({where: {loginuser}});
        if (existingUser) {
            return res.status(400).json({message: 'Login already exists'}); 
        }
        const hashedPassword  = await bcrypt.hash(password, 10);
        const user = await User.create({username, loginuser, password: hashedPassword, active: true});
        res.status(201).json({menssage: 'User createad successfully', user});
        //   return res.status(200).json({message: 'OK register'});
    } catch (error) {
        res.status(500).send(error.message);
    }
};


exports.login = async (req, res) => {
    try {
        const { loginuser, password } = req.body;
        const user = await User.findOne({where: {loginuser, active: true}});

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {id: user.id, username: user.username, loginuser: user.loginuser},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            res.json({token});
        } else {
            res.status(401).send({message: 'Invalid credentials or inactive user'});
        }
        //return res.status(200).json({message: 'OK login'});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

