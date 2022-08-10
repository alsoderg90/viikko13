/* eslint-disable no-unused-vars */
const { response } = require('express')
const app = require('../index')

const errorHandler = (error, request, response, next) => {
	console.log(error, error.name, "moasdasdas")

  if (error.name === 'SyntaxError') {
    return response.status(400).json({ error: error.message })
  }

  else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: "ASD" })
  }

  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error:error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}