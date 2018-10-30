const {
    Router
} = require('express')
const {
    Article,
    User
} = require('../db/models/index.js')
const {
    Op
} = require('sequelize')

const route = Router()

route.post('/', async (req, res) => {

    if (req.get('Authorization')) {

        const jwtToken = req.get('Authorization')
        const user = await User.findOne({
            where: {
                token: jwtToken.split(' ')[1]
            }
        })
        const newArticle = await Article.create({
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            userId: user.id
        })
        console.log(newArticle)
        newArticle.slug = newArticle.generateSlug(newArticle.title)
        newArticle.save().then(() => {
            res.status(201).json({
                message: 'article added',
                id: newArticle.id
            })
        })
    }
})

route.get('/', async (req, res) => {

    let whereClause = []
    for (let key of Object.keys(req.query)) {
        switch (key) {
            case 'tag':
                console.log('tag')
                break;
            case 'author':
                console.log('author')
                if (req.query.author) {
                    console.log('author=' + req.query.author);
                    const user = await User.findOne({
                        where: {
                            username: req.query.author
                        }
                    })
                    if (user) {
                        whereClause.push({
                            userId: user.id
                        })
                    }
                }
                break;
            case 'offset':
                console.log('offset')
                break;
            case 'limit':
                console.log('limit')
                break
        }
    }
    const articles = await Article.findAll({
        include: [User],
        // where: {
        //     whereClause
        // }
    })

    res.status(200).json(articles)

})

module.exports = route