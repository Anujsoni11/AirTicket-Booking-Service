const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

const bookingService = new BookingService();

const { createChannel, publishMessages } = require('../utils/messageQueue');
const { REMAINDER_BINDING_KEY } = require('../config/serverConfig');
const { json } = require('body-parser');

class BookingController {

    constructor() {
    }

    async sendMessagesToQueue(req, res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: 'This is a noti from queue',
                content: 'Some queue will subscribe this',
                recepientEmail: 'cs191297@gamil.com',
                noitficationTime: '2026-07-17T13:43:00'
            },
            service: 'CREATE_TICKET'
        };
        publishMessages(channel, REMAINDER_BINDING_KEY, json.stringify(payload));
        return res.status(200).json({
            message: 'Successfully published the event'
        });
    }

    async create(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully completed booking',
                data: response,
                err: {}
            });
        } catch (error) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                err: error.explanation
            });
        }
    }
}

module.exports = BookingController;