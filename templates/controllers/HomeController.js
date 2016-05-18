'use strict';

class HomeController extends BaseController {

  async index() {
    this.render('index');
  }

}

module.exports = HomeController;
