import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator';

import UserModel from './models/User.js';

mongoose
    .connect('mongodb+srv://admin:root@cluster0.lawtt.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/auth/register', registerValidator, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash,
    });

    const user = await doc.save();

    res.json(user);
});

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server ok');
});