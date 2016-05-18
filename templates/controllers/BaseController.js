'use strict';

class BaseController extends Controller {

  before() {
    super.before();

    this.set('currentUser', this.currentUser());
    this.helper('global');
  }

  currentUser() {
    return this.ctx.passport.user || null;
  }

}

module.exports = BaseController;