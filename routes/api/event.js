const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/models');

const router = express.Router();

router.get(
    '/:type',
    asyncHandler (async (req, res, next) => {
        const events = await Event.getEvent(req.params.type);
        return res.json({ events });
    })
);

router.post(
    '/',
    asyncHandler (async (req, res, next) => {
        // console.log(req.body.params.params)
        const events  = await Event.addEvent(req.body.params.params);
        return res.json({ data: events});
    })
);

// router.update();
// router.delete();




module.exports = router;
