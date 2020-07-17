require('dotenv').config()

const config = {
  HOOK: process.env.HOOK,
  PORT: process.env.PORT || 5000
}

module.exports = { config }