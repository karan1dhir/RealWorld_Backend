const {
    Router
} = require('express')
const {
    User
} = require('../db/models/index.js')

const route = Router()

route.post('/', async (req, res) => {
    console.log(User)
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    })
    res.status(201).json({
        message: 'User added',
        id: newUser.id
    })
})

module.exports = route