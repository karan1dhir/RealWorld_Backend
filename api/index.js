const {
    Router
} = require('express')
const route = Router()


route.use('/users', require('./routes/users'))

route.get('/', async (req, res) => {
    res.status(200).json({
        error: {
            message: "specific resource api/users"
        }
    })
})

module.exports = route