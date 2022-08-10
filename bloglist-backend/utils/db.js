const Sequelize = require('sequelize')
const logger = require('./logger')
const { pgUrl } = require('./config')

const sequelize = new Sequelize(pgUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    logger.info('connecting to', pgUrl)
  } catch (err) {
    logger.error('connecting database failed')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }