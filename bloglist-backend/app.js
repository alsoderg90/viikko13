const { Sequelize, QueryTypes } = require('sequelize')
const cors = require('cors')
const express = require('express')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')

const main = async () => {
	try {
	  await Blog.sync()
	  await config.sequelize.authenticate()
	  const blogs = await config.sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
	  blogs.map(blog => 
		console.log(`${blog.author}: '${blog.title}', url: ${blog.url}, ${blog.likes} likes`)
	  )
	} catch (error) {
	  console.error('Unable to connect to the database:', error)
	}
  }
main()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)


module.exports = app