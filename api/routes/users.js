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

    }).then(()=>{
      console.log("user has been successfully created")
      const jwtToken = newUser.generateJwtToken()
      newUser.token = jwtToken
      res.status(201).json({
        message: 'User added',
        id: newUser.id,
        token:newUser.token
    }) 
   }).catch(()=>{
       console.log("error")
       res.status(400).json({
           message:"user already exists"
       })
   })
})

route.post('/login',async(req,res) =>{
   
})

module.exports = route