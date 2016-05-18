module.exports = {

  serializeUser: function(user, done) {
    done(null, user.id);
  },

  deserializeUser: function(id, done) {
    User.findOne({_id: id}, function(err, user) {
      cb(err, user);
    });
  }

};
