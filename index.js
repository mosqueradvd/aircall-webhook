const express = require('express')
const postToSlack = require('./postToSlack.js')
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser');

express()
  .use(bodyParser.urlencoded({ extended: false }))

  .use(bodyParser.json())

  .get('/', (req, res) => res.send('Webhook!'))

  .post('/aircall/calls', (req, res) => {
    if (req.body.event === 'call.ringing_on_agent') {
      // res.send({ "message": "Server is running" })
      postToSlack(req.body.text)
    }
    else {
      console.warn('Even type non-handled:', request.body.event);
    }
    res.sendStatus(200);
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))

