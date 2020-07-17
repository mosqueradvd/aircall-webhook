const fetch = require('node-fetch');
const { config } = require('../config')

const postToSlack = async () => {
  const webhookURL = `${config.HOOK}`

  const data = JSON.stringify({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Reto Cumplido* \n`,
        },
        accessory: {
          type: 'image',
        },
      },
    ],
  });

  await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
  }).then((response) => {
    console.log(response.size);
  });
};

module.exports = postToSlack;