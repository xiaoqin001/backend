// User Auth Middlewares
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
const { secret, expiresIn } = jwtConfig;

// This function will be used in the login and signup routes later.
const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn)}
    )

    const isProduction = process.env.NODE_ENV == 'production';

    // set Token cookies
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    })

    return token;
}


// restore the session user based on the contents of the JWT cookie.
const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    // console.log(req.user)

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err){
            return next();
        }
        try {
            const { id } = jwtPayload.data;
            // req.user = await User.findByPk(id);
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
        }
        if (!req.user) {
            res.clearCookie('token');
        }

        return next();
    });
};

// for requiring a session user to be authenticated before accessing a route.
const requireAuth = [
    restoreUser,
    function (req, _res, next) {
      if (req.user) return next();

      const err = new Error('Unauthorized');
      err.title = 'Unauthorized';
      err.errors = ['Unauthorized'];
      err.status = 401;
      return next(err);
    }
  ];

  module.exports = { setTokenCookie, restoreUser, requireAuth };
