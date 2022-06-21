import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

mongoose
    .connect('mongodb+srv://admin:root@cluster0.lawtt.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/auth/login', (req, res) => {
    const token = jwt.sign({
        email: req.body.email,
        password: req.body.password
    },
        'secret123'
    );

    res.json({
        token
    });
});

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server ok');
});