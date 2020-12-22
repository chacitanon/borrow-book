const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("../../models");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  if (payload.role === 'USER') {

    const targetUser = await db.User.findOne({ where: { id: payload.id } });

    if (targetUser) {
      done(null, targetUser);
    } else {
      done(null, false);
    }
  } else {
    const targetAdmin = await db.Admin.findOne({ where: { id: payload.id } });

    if (targetAdmin) {
      done(null, targetAdmin);
    } else {
      done(null, false);
    }
  }


});

passport.use("jwt", JWTStrategy);
