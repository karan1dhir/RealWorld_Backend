const jwt = require('express-jwt')
var auth = {
    required:jwt({
        secret:'karan',
        credentialsRequired:false,
        userProperty:'payload',
        getToken:function getTokenFromHeader(req){
            console.log("ïnside a middleware")
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
                    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                  return req.headers.authorization.split(' ')[1];
            }
        }
    })
}
module.exports = auth