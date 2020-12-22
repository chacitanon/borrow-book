const db = require('../models');
const { Op } = require("sequelize");

const getAllCarts = async (req, res) => {
  const cartBooks = await db.Cart.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: db.Book,
        require: true
      }
    ]
  });
  res.status(200).send(cartBooks);
};

const addCarts = async (req, res) => {
  const { qty } = req.body;
  const targetId = req.params.id;
  const getCart = await db.Cart.findOne({
    where: { book_id: targetId, user_id: req.user.id },
    include: [db.Book]

  });

  if (getCart) {
    const updatedCart = await getCart.increment('qty', { by: +qty });
    res.status(200).send(Object.assign(updatedCart, { qty: updatedCart.qty + qty }));
  } else {
    const cartBook = await db.Cart.create({
      book_id: +targetId,
      user_id: req.user.id,
      qty: +qty
    });
    res.status(200).send(cartBook);
  }
};

const deleteCarts = async (req, res) => {
  const targetId = req.params.id;
  const targetCart = await db.Cart.findOne({
    where: { book_id: targetId, user_id: req.user.id },
    include: [db.Book]
  });
  await targetCart.destroy();
  res.status(204).send();
};


module.exports = {
  getAllCarts,
  addCarts,
  deleteCarts
};