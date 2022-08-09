const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const config = require('../utils/config')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	try {
	console.log(req.body)
	const blog = await Blog.create(req.body)
	res.json(blog)
	} catch(error) {
		return res.status(400).json({ error })
	}
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findByPk(req.params.id)
	if (blog) {
	  res.json(blog)
	} else {
	  res.status(404).end()
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	const blog = await Blog.destroy({where: {id: req.params.id}})
	if (blog) {
	  res.json(blog)
	} else {
	  res.status(404).end()
	}
})


module.exports = blogsRouter