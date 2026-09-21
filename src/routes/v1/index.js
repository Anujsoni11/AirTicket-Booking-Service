const express = require('express');

const { BookingController } = require('../../controllers/index');
// const { createChannel } = require('../../utils/messageQueue');

// const channel = await createChannel();
const bookingController = new BookingController(channel);

const router = express.Router();

router.get('/info', (req, res) => {
    return res.json({message: 'Response form routes'});
})
router.post('/booking', bookingController.create);
router.post('/publish', bookingController.sendMessagesToQueue);

module.exports = router;