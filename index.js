import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { registerValidator } from './validations/auth.js';
import { validationResult } from 'express-validator';

mongoose
    .connect('mongodb+srv://admin:root@cluster0.lawtt.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/auth/register', registerValidator, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    res.json({
        success: true
    })
});

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server ok');
});