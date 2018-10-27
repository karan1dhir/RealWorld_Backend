const Sequelize = require('sequelize')
const {
    user
} = require('./user')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/store.db'
})

const User = db.define('user', user)

module.exports = {
    db,
    User
}