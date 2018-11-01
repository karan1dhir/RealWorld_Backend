const express = require('express')
const cors = require('cors')

const {
    db
} = require('./api/db/models/index.js')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use('/api', require('./api/index.js'))

db.sync({})
    .then(() => {
        console.log('Database Synced')
        app.listen(2399, () => {
            console.log('Server started http://localhost:2399')
        })
    })
    .catch(console.error)