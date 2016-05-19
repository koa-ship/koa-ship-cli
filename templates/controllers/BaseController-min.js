'use strict';

class BaseController extends Controller {

  before() {
    super.before();

    this.helper('global');
  }

}

module.exports = BaseController;