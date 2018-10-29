const {
    Router
} = require('express')
const {
    Article
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

    const articles = await Article.findAll()   
    res.status(200).json(articles)

})

module.exports = route