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
        // console.log(user)
    }
})

module.exports = route