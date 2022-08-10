const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const { Op } = require('sequelize')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {     
			logger.info(authorization.substring(7))
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
		} catch (error){
			logger.error(error)
			return res.status(401).json({ error: 'token invalid' })
		}  
	} else {
		return res.status(401).json({ error: 'token missing' })
	}  
	next()
}

const blogFinder = async (req, res, next) => { 
	req.blog = await Blog.findByPk(req.params.id)  
	next()	
}

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.findAll({
		attributes: {exclude: ['userId'] },
		include: {
			model: User,
			attributes: ['name']
		    },
		where: req.query.search ?
		{
			[Op.or]: [{ 
			  title: {
				[Op.iLike]: req.query.search ? `%${req.query.search}` : ''
			  }
			},{ 
			  author: {
			  	[Op.iLike]: req.query.search ? `%${req.query.search}` : ''
			  }
			}]
		} : {},
		order: [['likes', 'DESC']]  
	})
	res.json(blogs)
})

blogsRouter.post('/', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
	res.status(204).json(blog).end()
})

blogsRouter.get('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
	  res.json(req.blog)
	} else {
	  res.status(404).end()
	}
})

blogsRouter.delete('/:id', blogFinder, async (req, res) => {
	if (req.blog) {
	  await req.blog.destroy()
	  res.status(204).end()
	} else {
	  res.status(404).end()
	}
})

blogsRouter.put('/:id', blogFinder, async (req, res) => {
	  req.blog.likes = req.body.likes
	  await req.blog.save()
	  res.status(204).end()
  })


module.exports = blogsRouter