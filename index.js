const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})