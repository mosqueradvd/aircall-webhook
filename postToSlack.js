const fetch = require('node-fetch');

const postToSlack = async (dataInfo) => {
  const webhookURL = `${process.env.HOOK}`;
  await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: dataInfo,
  }).then((response) => {
    console.log(response.size);
  });
};

module.exports = postToSlack;