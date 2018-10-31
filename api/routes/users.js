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
        id: newUser.id,

    })
})

route.post('/login', async (req, res) => {
    if (req.body.email) {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (!user) {
                res.status(400).json({
                    message: "username not found"
                })
            }
            let jwtToken = user.generateJwtToken()
            console.log(jwtToken)
            user.token = jwtToken
            user.save().then(() => {
                res.status(201).json({
                    user: user
                })
            })
        })
    }
})


module.exports = route