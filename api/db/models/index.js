const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const slug = require('slug')
const {
    user
} = require('./user')
const {
    article
} = require('./article')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/store.db'
})


const User = db.define('user', user)
const Article = db.define('article', article)

Article.belongsTo(User)
User.hasMany(Article)


User.prototype.generateJwtToken = function () {
    return jwt.sign({
        id: this.id,
        username: this.username,
    }, 'karan')
}
Article.prototype.generateSlug = function (title) {
    let titleslug = slug(title) + "-" + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    return titleslug
}

module.exports = {
    db,
    User,
    Article
}