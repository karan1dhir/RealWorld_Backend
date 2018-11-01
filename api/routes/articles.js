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
const auth = require('./auth')
const route = Router()

route.use('/:slug/comments', require('./comments'))


route.post('/', async (req, res) => {

    if (req.get('Authorization')) {

        const jwtToken = req.get('Authorization')
        const user = await User.findOne({
            where: {
                token: jwtToken.split(' ')[1]
            }
        })
        console.log(user)
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

                article: newArticle
            })
        })
    } else {
        res.status(401).json({
            message: 'user not authenticated'
        })
    }
})

route.get('/', async (req, res) => {

    let limit = 1
    let offset = 0
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
                if (req.query.offset) {
                    offset = req.query.offset
                }
                break;
            case 'limit':
                if (req.query.limit) {
                    limit = req.query.limit
                }
                console.log('limit')
                break
        }
    }
    const articles = await Article.findAll({
        include: [{
            model: User,
            attributes: ['username', 'bio', 'image']
        }],
        where: {
            [Op.and]: whereClause

        },
        limit: limit,
        offset: offset
    }).then((articles) => {
        allArticles = []
        articles.forEach(article => {
            allArticles.push(article.toSendJSONArray())
        });
        res.status(200).json({
            articles: allArticles,
            articlesCount: allArticles.length
        })
    })
})

route.put('/:slug', auth.required, async (req, res) => {

    User.findById(req.payload.id).then((user) => {

        const findArticle = Article.findOne({
            where: {
                slug: req.params.slug
            }
        }).then((findArticle) => {

            if (!findArticle) {
                res.status(401).json({
                    message: 'Article not found'
                })
            }
            if (typeof req.body.article.title !== 'undefined') {
                findArticle.title = req.body.article.title;
            }

            if (typeof req.body.article.description !== 'undefined') {
                findArticle.description = req.body.article.description;
            }

            if (typeof req.body.article.body !== 'undefined') {
                findArticle.body = req.body.article.body;
            }
            findArticle.save()
            res.status(200).json({
                "message": "Article updated successfully",
                Article: findArticle
            })
        })
    })

})
route.delete('/:slug', auth.required, async (req, res) => {

    User.findById(req.payload.id).then((user) => {

        if (!user) {
            return res.status(401).json({
                message: 'user donot exist'
            })
        }
        const findArticle = Article.findOne({
            where: {
                slug: req.params.slug
            }
        }).then((findArticle) => {

            if (!findArticle) {
                res.status(401).json({
                    message: 'Article not found'
                })
            }
            if (findArticle.userId === user.id) {
                findArticle.destroy()
            }
            res.status(200).json({
                message: 'Article Deleted Successfully !'
            })
        })
    })
})














module.exports = route