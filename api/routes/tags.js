const {
    Router
} = require('express')
const {
    Tags
} = require('../db/models/tag')
const auth = require('./auth')


const route = Router()


route.get('/', auth.optional, async (req, res) => {

      
 

})
module.exports = route