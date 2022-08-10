const Sequelize = require('sequelize')
const logger = require('./logger')
const { pgUrl } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(pgUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const runMigrations = async () => {
	const migrator = new Umzug({
		migrations: {
			glob: 'migrations/*.js',
		    },    
		storage: new SequelizeStorage({
			sequelize, tableName: 'migrations' }),
			context: sequelize.getQueryInterface(),
			logger: console,  
		})  
		const migrations = await migrator.up()
		logger.info('Migrations up to date', {
			files: migrations.map((mig) => mig.name),
			//count: migrations.length,	
		})
	}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
	await runMigrations()
    logger.info('connecting to', pgUrl)
  } catch (err) {
    logger.error('connecting database failed', err)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }