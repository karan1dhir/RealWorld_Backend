const {
    Router
} = require('express')
const {
    User
} = require('../db/models/index.js')

const route = Router()

route.post('/',(req, res) => {
    console.log(User)
    const newUser = User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    }).then(()=>{
      console.log("user has been successfully created")
      res.status(201).json({
        message: 'User added',
        id: newUser.id
    }) 
   }).catch(()=>{
       console.log("error")
       res.status(400).json({
           message:"user already exists"
       })
   })
})

route.post('/login',async(req,res) =>{
   if(req.body.email){
       const user = await User.findOne({
           where : {email: req.body.email}
       })
       const jwtToken = user.generateJwtToken()
       user.token = jwtToken
       if(!user){
            res.status(400).json({
               message:"username not found"
           }) 
       }
       console.log(user.email)
       res.status(201).json({
           message: 'User found',
           User:user
       })
   }
})

module.exports = route