const authorsRouter = require('express').Router()
const { sequelize } = require('../utils/db')
const { User } = require('../models')
const { Blog } = require('../models')

authorsRouter.get('/', async (req, res) => {
  const users = await Blog.findAll({
	attributes: [
		'author', 
		[sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
		[sequelize.fn('SUM', sequelize.col('likes')), 'likes']
	],
	group: 'author',
  })
  res.json(users)
})

module.exports = authorsRouter