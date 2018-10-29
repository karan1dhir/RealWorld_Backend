const {
    Router
} = require('express')
const {
    Article,User
} = require('../db/models/index.js')

const route = Router()

route.post('/',(req,res)=>{

    const newArticle = Article.create({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body 
    }).then(() => {
        console.log(newArticle)
        console.log("article successfully created")
        // newArticle.slug = newArticle.generateSlug()
        res.status(201).json({
            message: 'article added',
            id: newArticle.id
        })
    }).catch(()=>{
        console.log('error')
        res.status(400).json({
           message: 'error occured while creating'
        })
    })
})

route.get('/',async(req,res)=>{

    let whereClause = []
    for(let key of Object.keys(req.query)){
        switch(key){
         case 'tag':console.log('tag')
         break;
         case 'author':console.log('author')
         if(req.query.author){
            console.log('author='+req.query.author);
            const user = await User.findOne({
                where:{username:req.query.author}
            }).then((user)=>{
                 if(user){
                     whereClause.push({userId:user.id})
                 }
            })           
         } 
          break;
          
          
        }
    }
    const articles = await Article.findAll()   
    res.status(200).json(articles)

})

module.exports = route