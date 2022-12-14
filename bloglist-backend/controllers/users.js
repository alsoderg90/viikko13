const usersRouter = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }    }
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

usersRouter.get('/:username', async (req, res) => {
  const user = await User.findByPk(req.params.username)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.put('/:username', async (req, res) => {
	const user = await User.findOne({where: {username: req.params.username}});
	if (user) {
	  user.username = req.body.username
	  await user.save()
	  res.json(user)
	} else {
	  res.status(404).end()
	}
  })

module.exports = usersRouter