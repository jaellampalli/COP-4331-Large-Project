const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs');
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
require('dotenv').config();
const usersRouter = require("./routes/usersRouter");
const lessonsRouter = require("./routes/lessonsRouter");

let client;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

async function main()
{
  client = new MongoClient(process.env.MONGO_URI);
  console.log("Main - Ready");
}
main().catch(console.error);


app.post('/login', (req, res) => {
  let data = req.body;
  res.send('Data Received: ' + JSON.stringify(data));
})

app.get('/', async (req, res) => { 
    fs.readFile('templates/base.html', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data);
    })
})

app.get('/static/css/styles.css', async (req, res) => { 
    fs.readFile('static/css/styles.css', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data);
    })
})

app.post('/printdata', async (req, res) => {
  await client.connect();
  const cursor = client.db("projectdb").collection("users").find();
  let results = await cursor.toArray();
  res.send(results);
})

app.get('/test', (req, res) => {
    res.send('Testing again!')
})

app.get('/signup', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', (req, res) => {
    res.send('Hello World!')
})

app.get('/loadlesson', (req, res) => {
    res.send('Hello World!')
})

app.get('/savelesson', (req, res) => {
    res.send('Hello World!')
})

app.get('/updatelesson', (req, res) => {
    res.send('Hello World!')
})

app.use("/users", usersRouter);
app.use("/lessons", lessonsRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})