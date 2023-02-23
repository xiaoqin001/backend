const express = require('express');
const asyncHandler = require('express-async-handler');
const { Cart } = require('../../db/models');
const { RegisteredEvent } = require('../../db/models');

const router = express.Router();

router.get(
    '/:cartID',
    asyncHandler(async (req, res, next) => {
        const cartID = req.params.cartID;
        // const cart = await Cart.getCart(cartID);
        const registered_event = await RegisteredEvent.getRegisteredEvent(cartID);
        console.log(registered_event);

        return res.json({registered_event});
    })
);

// router.post(
//     '/',
//     asyncHandler(async (req, res, next)  => {
//         const UserID = req.body;
//         const cart = await Cart.createCart(UserID);

//         return res.json({ data: cart });
//     })
// )

// router.put();
router.delete(
    '/:cartId',
    (req, res) => {
        const cartID = req.params.cartId;
        console.log('1');
        console.log(req.params);
        RegisteredEvent.clear(cartID);
    }
);

module.exports = router;
