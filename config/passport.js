'use strict'
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var db = require('../app/helpers/db')
var config = require('../config/main')

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  console.log(passport)
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.secret
  }

  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      console.log(jwt_payload)
      db.findUser(
        { email: jwt_payload.user_email },
        function(res) {
          var user = res
          delete user.password
          callback(null, user)
        },
        function(err) {
          return callback(err, false)
        }
      )
    })
  )
}
