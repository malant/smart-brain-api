const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const req = require('express/lib/request');
let cors = require('cors');
const knex =  require ('knex');
const { user } = require('pg/lib/defaults');
const res = require('express/lib/response');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1UtwAbsm9611',
      database : 'smart-brain'
    }
  });

  db.select('*').from ('users').then(data => {
      console.log(data);
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {res.send(database.users);})
app.post('/signin', signin.handleSignin(db, bcrypt ))


app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)} )
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} )

app.listen(3000);

/*
    / --> responds with this is working
    /signin --> POST =  success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    //image --> PUT --> usr
*/