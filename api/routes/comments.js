const {
    Router
} = require('express')
const {
    User,
    Comment,
    Article
} = require('../db/models/index')
const {
    Op
} = require('sequelize')
const auth = require('./auth')

const route = Router()

route.post('/', auth.required, async (req, res) => {

    User.findById(req.payload.id).then((user) => {

        if (!user) {
            return res.status(401).json({
                message: 'user doesnot exist'
            })
        }
        const findArticle = Article.findOne({
            where: req.params.slug
        })
        console.log(findArticle)

        const newComment = Comment.create({
            body: req.body.comment.body,
            userId: user.id,
            articleId: findArticle.id

        }).then((newComment) => {
            res.status(201).json({
                comment: newComment
            })
        })
    })
})
// route.get('/', auth.optional, async (req, res) => {




// })

module.exports = route