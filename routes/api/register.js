const express = require('express');
const asyncHandler = require('express-async-handler');
const { Event } = require('../../db/models');
const { Register } = require('../../db/models');
const { RegisteredEvent } = require('../../db/models');

const router = express.Router();

router.post(
    '/',
    asyncHandler(async (req, res, next) => {
        console.log(req.body.params.sessionInfo)

        await Event.register(req.body.params.sessionInfo);

        const register = await Register.registerEvent(req.body.params.sessionInfo);

        const params = req.body.params.sessionInfo;
        params['registerID'] = register.id

        const registeredEvent = await RegisteredEvent.register(params);

        const event = await Event.getDetails(req.body.params.sessionInfo.event);

        return res.json({event});
    })
)


module.exports = router;
