require('dotenv').config()
const logger = require('./logger')
const { Sequelize } = require('sequelize')

let pgUrl = process.env.POSTGRESQL_URI
let PORT = process.env.PORT || 3001


// if (process.env.NODE_ENV === 'test') { 
//     pgUrl = process.env.TEST_MONGODB_URI
    
// }

logger.info('connecting to', pgUrl)

const sequelize = new Sequelize(pgUrl, {
	dialectOptions: {
	  ssl: {
		require: true,
		rejectUnauthorized: false
	  }
	},
})

module.exports = {
    pgUrl, PORT, sequelize
}