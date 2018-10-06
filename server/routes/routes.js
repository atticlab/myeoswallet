const methodList = require('../controllers/mainController');

module.exports = (app) => {
  app.route('/newaccount')
    .post(methodList.newAccount);
};
