const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('.');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.put('/image', (req, res) => {image.handleImageCountInc(req, res, db) });

app.post('/imageurl', (req, res) => { image.handledClarifaiRequest(req, res) });

app.listen(process.env.PORT || 3000, () => {
    console.log('server running on port 3000');
})
