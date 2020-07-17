const express = require('express')
const postToSlack = require('./utils/postToSlack.js')
const { config } = require('./config')

const bodyParser = require('body-parser');

express()
  .use(bodyParser.urlencoded({ extended: false }))

  .use(bodyParser.json())

  .get('/', (req, res) => res.send('Webhook!'))

  .post('/aircall/calls', (req, res) => {
    // if (req.body.event === 'call.ringing_on_agent') {
    // res.send({ "message": "Server is running" })
    console.log(req.body)
    postToSlack()
    // }
    // else {
    // console.warn('Even type non-handled:', request.body.event);
    // }
    res.sendStatus(200);
  })

  .listen(`${config.PORT}`, () => console.log(`Listening on ${config.PORT}`))

