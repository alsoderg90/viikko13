const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const blogFinder = async (req, res, next) => { 
	req.blog = await Blog.findByPk(req.params.id)  
	next()	
}

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.findAll()
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const blog = await Blog.create(req.body)
	res.status(204).end()
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