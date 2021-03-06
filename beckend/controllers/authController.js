const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userUpload = function (req, res) {
  console.log("storage location is ", req.hostname + "/" + req.file.path);
  return res.send(req.file);
};

const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetUser = await db.User.findOne({ where: { username } });
    console.log(req.body);

    if (targetUser) {
      res.status(400).send({ message: "This username has been chosen" });
    } else {
      bcryptjs.genSalt(Number(process.env.SALT_ROUND), async (err, salt) => {
        if (err) res.status(400).send({ message: "Sorry salt went wrong" });
        bcryptjs.hash(password, salt, async (err, hashedPw) => {
          if (err)
            res
              .status(400)
              .send({ message: "Sorry something went wrong here!" });
          await db.User.create({
            ...req.body,
            password: hashedPw,
          });
          res.status(200).send({ message: "hooray!" });
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Sorry something went wrong" });
  }
};

const adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;
    const targetAdmin = await db.Admin.findOne({ where: { username } });
    console.log(req.body);

    if (targetAdmin) {
      res.status(400).send({ message: "This username has been chosen" });
    } else {
      bcryptjs.genSalt(Number(process.env.SALT_ROUND), async (err, salt) => {
        if (err) res.status(400).send({ message: "Sorry salt went wrong" });
        bcryptjs.hash(password, salt, async (err, hashedPw) => {
          if (err)
            res
              .status(400)
              .send({ message: "Sorry something went wrong here!" });
          await db.Admin.create({
            ...req.body,
            password: hashedPw,
          });
          res.status(200).send({ message: "hiiiiiiiiiii" });
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Sorry Admin something went wrong" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const targetUser = await db.User.findOne({ where: { username } });

    if (!targetUser) {
      res.status(400).send({ message: "Username or password is wrong" });
    } else {
      bcryptjs.compare(password, targetUser.password, async (err, result) => {
        if (err)
          res.status(400).send({ message: "Sorry something went wrong" });
        const payload = {
          name: targetUser.name,
          id: targetUser.id,
          role: "USER",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 36000,
        });
        res.status(200).send({ token, message: "login succes!" });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Sorry something went wrong" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const targetAdmin = await db.Admin.findOne({ where: { username } });

    if (!targetAdmin) {
      res
        .status(400)
        .send({ message: "Username or password of Admin is wrong" });
    } else {
      bcryptjs.compare(password, targetAdmin.password, async (err, result) => {
        if (err)
          res.status(400).send({ message: "Sorry  something went wrong" });

        const payload = {
          name: targetAdmin.name,
          id: targetAdmin.id,
          role: "ADMIN",
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 36000,
        });
        res.status(200).send({ token, message: "login succes!" });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Sorry something went wrong" });
  }
};

const facebookLogin = async (req, res) => {
  try {
    console.log("IM HERE");
    res.status(200).send("HELOO");
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "bad request" });
  }
};

module.exports = {
  userRegister,
  adminRegister,
  userLogin,
  adminLogin,
  facebookLogin,
};
