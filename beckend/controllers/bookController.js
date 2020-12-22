const db = require('../models');
const { Op } = require("sequelize");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');


const getAllBooks = async (req, res) => {
  const searchString = req.query._search?.toLowerCase();
  try {
    const book = await db.Book.findAll({
      where: searchString
        ? {
          [Op.or]: [
            db.sequelize.where(
              db.sequelize.fn("lower", db.sequelize.col("name")),
              "LIKE",
              `%${searchString}%`
            ),
          ],
        }
        : null,
    });
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

const getOneBook = async (req, res) => {
  try {
    const getBook = await db.Book.findOne({
      where: { id: req.params.id }
    });
    res.status(200).send(getBook);
  } catch (err) {
    console.log(err);
  }
};

// const addBook = async (req, res) => {
//   const newBook = await db.Book.create({
//     ...req.body
//   });
//   res.status(201).send(newBook);
// };

const addBook = async (req, res) => {
  console.log(req.file);
  const file = req.file;
  console.log(req.body);
  cloudinary.uploader.upload(file.path, async (error, result) => {

    const newBook = await db.Book.create({
      ...req.body,
      main_image: result.secure_url,
      publicId: result.public_id
    });


    fs.unlinkSync(file.path);
    res.status(201).send(newBook);
  });

};

const updateBook = async (req, res) => {

  const targetId = req.params.id;
  const file = req.file;
  const targetBook = await db.Book.findOne({
    where: { id: targetId },
  });

  if (file) {
    cloudinary.uploader.destroy(targetBook.publicId, async (err, result) => {
      console.log(result);
    });

    cloudinary.uploader.upload(file.path, async (err, result) => {
      await db.Book.update({
        ...req.body,
        main_image: result.secure_url,
        publicId: result.public_id
      }, {
        where: { id: targetId }
      });
    });
    res.status(200).send({ message: "updating is success" });
  } else {
    console.log('aaaaa', req.body);
    targetBook.update({ ...req.body });
  }
  res.status(200).send({ message: "update" });
};

const deleteBook = async (req, res) => {
  const targetId = req.params.id;
  await db.Book.destroy({
    where: { id: targetId }
  });
  res.status(204).send({ message: "success" });
};



module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
};