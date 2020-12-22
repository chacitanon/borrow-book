const express = require('express');
const route = express.Router();
const cartController = require('../controllers/cartController');
const passport = require('passport');
const authentication = passport.authenticate('jwt', { session: false });


route.get('/', authentication, cartController.getAllCarts);
route.post('/:id', authentication, cartController.addCarts);
route.delete('/:id', authentication, cartController.deleteCarts);

module.exports = route;