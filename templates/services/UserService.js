'use strict';

module.exports = {

  deserialize: function(id, cb) {
    User.findOne({_id: id}, function(err, user) {
      cb(err, user);
    });
  }

};