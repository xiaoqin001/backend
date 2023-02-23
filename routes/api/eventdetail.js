const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/models');

const router = express.Router();

router.get(
    '/:eventId',
    asyncHandler (async (req, res, next) => {
        console.log(req.params.eventId)
        const events = await Event.getDetails(req.params.eventId);
        return res.json({ events });
    })
);



// router.update();
// router.delete();




module.exports = router;
