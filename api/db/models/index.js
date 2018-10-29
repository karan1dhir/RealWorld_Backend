const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
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
const Article = db.define('article',article)
User.prototype.generateJwtToken = function(){
    return jwt.sign({
        id:this.id,
        username:this.username,
    },'karan')
}
Article.prototype.generateSlug = function(){
   this.slug = slug(this.title) + "-" + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

module.exports = {
    db,
    User,
    Article
}