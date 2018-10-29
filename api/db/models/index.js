const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const {
    user
} = require('./user')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/store.db'
})


const User = db.define('user', user)
User.prototype.generateJwtToken = function(){
    return jwt.sign({
        id:this.id,
        username:this.username,
    },'karan')
}

module.exports = {
    db,
    User
}