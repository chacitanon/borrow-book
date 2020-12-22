const express = require('express');
const route = express.Router();
const borrowController = require('../controllers/borrowController');
const passport = require('passport');
const authentication = passport.authenticate('jwt', { session: false });

route.get('/', authentication, borrowController.borrowAllBooks);
route.delete('/:id', authentication, borrowController.returnBook);
route.post('/', authentication, borrowController.addBorrow);
module.exports = route;