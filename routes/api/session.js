const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { Cart } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator/check');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// User Login API Route

 const validateLogin = [
    check('credential')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Please provide a valid email or password'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Please provide a password'),
    handleValidationErrors
 ]

router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });
        const cart = await Cart.getcart(user.id);

        let senddata = [];
        let obj = {};
        obj['user'] = user;
        obj['cart'] = cart;
        senddata.push(obj);

        if (!user) {
            const err = new Error('Login failed');
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            err.status = 401;
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({ data: senddata });
    })

);

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);



router.get(
    '/',
    restoreUser,
    async (req, res) => {
        const { user } = req;
        // console.log(user)
        if (user) {
            const cart = await Cart.getcart(user.id);
            let senddata = [];
            let obj = {};
            obj['user'] = user.toSafeObject();
            obj['cart'] = cart;
            senddata.push(obj);
            return res.json({
                data: senddata
            });
        } else {
            return res.json({})
        }
    }
);


module.exports = router;
