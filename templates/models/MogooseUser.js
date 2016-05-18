'use strict';

import crypto from 'crypto';

class User extends Model {

  /////////////////////////////////// schema ///////////////////////////////////
  static schema() {
    return {
      name: 'users',

      fields: {
        username:        { type: String, required: true, unique: true, index: true },
        email:           { type: String, required: true, unique: true },
        hashedPassword:  { type: String, required: true },
        salt:            { type: String, required: true },
      },

      options: {},
      index: []
    };
  }

  /////////////////////////////////// static methods ///////////////////////////////////
  static async validate(username, password) {
    let user = await this.findOne({username: username});

    if (!user) {
      return ['username or password are not correct', null];
    }

    if (!user.checkPassword(password)) {
      return ['username or password are not correct', null];
    }

    return [null, user];
  }

  static async findByEmail(email) {
    return this.findOne({email: email});
  }
  
  /////////////////////////////////// get/set methods ///////////////////////////////////
  get password() {
    return this._plainPassword;
  }

  set password(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  }

  /////////////////////////////////// instance methods ///////////////////////////////////
  encryptPassword(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }

  checkPassword(password) {
    return this.encryptPassword(password) === this.hashedPassword;
  }

}

module.exports = User;
