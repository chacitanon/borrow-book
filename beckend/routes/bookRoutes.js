const express = require('express');
const route = express.Router();
const bookController = require('../controllers/bookController');
const upload = require('../config/multer/multer');

route.get('/', bookController.getAllBooks);
route.get('/:id', bookController.getOneBook);
// route.post('/', bookController.addBook);
// route.patch('/:id', bookController.updateBook);
route.delete('/:id', bookController.deleteBook);

route.post('/', upload.single('main_image'), bookController.addBook);
route.patch('/:id', upload.single('main_image'), bookController.updateBook);

module.exports = route;