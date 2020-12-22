const db = require('../models');
const { Op } = require("sequelize");
const fs = require('fs');


const borrowAllBooks = async (req, res) => {
  const cartBooks = await db.Borrow.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: db.Book,
        require: true
      }
    ],

  });

  const result = cartBooks.map(cartBook => ({
    ...cartBook.toJSON(),
    author: cartBook.Book.author,
    name: cartBook.Book.name,
    main_image: cartBook.Book.main_image
  }));
  //แก้ข้อมูลให้dataที่หน้าFrontโดยแปลงเป็นแบบJSONให้Frontอ่านได้
  res.status(200).send(result);
};

const returnBook = async (req, res) => {
  const targetId = req.params.id;
  const targetBorrow = await db.Borrow.findOne({
    where: { id: targetId, user_id: req.user.id },
  });

  if (targetBorrow) {
    await targetBorrow.destroy({});
  }
  res.status(204).send();
};

// const returnBook = async (req, res) => {
//   const targetId = req.params.id;
//   await db.Borrow.destroy({
//     where: { book_id: targetId, user_id: req.user.id },
//   }); res.status(204).send();
// };


const addBorrow = async (req, res) => {
  const carts = await db.Cart.findAll({ where: { user_id: req.user.id } });
  const borrowInput = carts.map(cart => ({ user_id: req.user.id, book_id: cart.book_id }));
  // const selectItem = req.body;
  // console.log(selectItem);
  // const { book_ids } = req.body;
  const newBorrow = await db.Borrow.bulkCreate(borrowInput);
  await db.Cart.destroy({ where: { user_id: req.user.id } });
  res.status(200).send(newBorrow);
};


module.exports = {
  borrowAllBooks,
  returnBook,
  addBorrow

};