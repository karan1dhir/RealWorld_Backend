const {
    Router
} = require('express')
const {
    User
} = require('../db/models/index.js')

const route = Router()

route.get('/', async (req, res) => {

    if (req.get('Authorization')) {
        const jwtToken = req.get('Authorization')
        console.log(jwtToken.split(' ')[1])
        const user = await User.findOne({
                where: {
                    token: jwtToken.split(' ')[1]
                }
            })
            .then((user) => {
                if (!user) {
                    res.status(400).json({
                        message: "username not found"
                    })
                }
                res.status(200).json({
                    User: user
                })
            }).catch(console.error)
    }
})

route.put('/', async (req, res) => {
    if (req.get('Authorization')) {
        const jwtToken = req.get('Authorization')
        const user = await User.findOne({
            where: {
                token: jwtToken.split(' ')[1]
            }
        }).then((user) => {
            if (!user) {
                res.status(204).json({
                    message: "username not found"
                })
            }
            console.log(user)
            if (typeof req.body.username !== undefined) {
                user.username = req.body.username;
            }
            if (typeof req.body.email !== undefined) {
                user.email = req.body.email
            }
            if (typeof req.body.password !== undefined) {
                user.password = req.body.password
            }
            user.save()
            res.status(200).json({
                message: "user successfull updated",
                User: user
            })
        })
    }
})



module.exports = route