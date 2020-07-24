const express = require('express')
const fetch = require('node-fetch');
const { config } = require('./config')
const bodyParser = require('body-parser');

express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())

  .get('/', (req, res) => res.send('Webhook!'))

  .post('/aircall/calls', (req, res) => {

    if (req.body.event === 'call.ringing_on_agent') {

      console.log('REQ BODY', req.body)

      const body = {
        data: req.body.event,

        text: `:calling: *Incoming call*
        *Queue:* ${req.body.data.number.name}
        *Ringing to:* ${req.body.data.user.name}
        *Caller:*  ${req.body.data.raw_digits}`
      };

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'call.agent_declined') {

      console.log('REQ BODY', req.body)

      const body = {
        data: req.body.event,
        text: `*⛔ Call DECLINED*
        *Queue:* ${req.body.data.number.name}
        *Declined by:* ${req.body.data.user.name}
        *Caller:*  ${req.body.data.raw_digits}`
      };

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'call.answered') {
      if (req.body.data.direction === 'inbound') {

        console.log('REQ BODY', req.body)

        const body = {
          data: req.body.event,
          text: `*✔ Call Answered *
          *Queue:* ${req.body.data.number.name}
          *Answered by:* ${req.body.data.user.name}
          *Caller* ${req.body.data.raw_digits}`
        };

        fetch(`${config.HOOK}`, {
          method: 'post',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(error => console.log('An error occurred', error))
      }
    } else if (req.body.event === 'call.voicemail_left') {

      console.log('REQ BODY', req.body)

      const body = {
        data: req.body.event,
        text: `*📬 Voice Mail - FOLLOW UP *
        *Queue:* ${req.body.data.number.name}
        *Missed call reason:* ${req.body.data.missed_call_reason}
        *Caller* ${req.body.data.raw_digits}
        *Recording:* ${req.body.data.voicemail}`
      };

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    }
    else if (req.body.event === 'call.assigned') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `*✋ Missed called Assigned to: * ${req.body.data.assigned_to.name}
        *Queue:* ${req.body.data.number.name}
        *Missed call reason:* ${req.body.data.missed_call_reason}
        *Caller* ${req.body.data.raw_digits}
        *Recording:* ${req.body.data.voicemail}`
      }

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'call.archived') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `*☎ Call Archived - Make sure it was followed up *
        *Queue:* ${req.body.data.number.name}
        *Missed call reason:* ${req.body.data.missed_call_reason}
        *Caller* ${req.body.data.raw_digits}
        *Recording:* ${req.body.data.voicemail}`
      }

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'call.hungup') {

      const data = {
        data: req.body.event,
        text: `Hanging up... Please wait`
      }

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'call.ended') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `Call ended.`
      }

      fetch(`${config.HOOK}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'user.connected') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `:male-office-worker: *${req.body.data.name}* is now online! :heavy_check_mark:`
      }

      fetch(`${config.HOOK2}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'user.disconnected') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `:mobile_phone_off: *${req.body.data.name}* just went offline❗`
      }

      fetch(`${config.HOOK2}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'user.opened') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `*${req.body.data.name}* is now available`
      }

      fetch(`${config.HOOK2}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    } else if (req.body.event === 'user.closed') {

      console.log('REQ BODY', req.body)

      const data = {
        data: req.body.event,
        text: `:away: ${req.body.data.name} moved to DND :brb:`
      }

      fetch(`${config.HOOK2}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => console.log('An error occurred', error))

    }
    else {
      console.warn('Even type non-handled:', req.body.event);
      res.status(204).json({
        data: req.body.event,
        text: 'No content'
      });
    }
    res.sendStatus(200)
  })

  .listen(`${config.PORT}`, () => console.log(`Listening on ${config.PORT}`))

