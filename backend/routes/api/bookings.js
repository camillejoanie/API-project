const express = require('express');
const { Op } = require ('sequelize');
const { Booking, Spot, SpotImage, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const validateNewBooking = [
    check("startDate")
        .exists({ checkFalsy: true })
        .isDate()
        .withMessage("Start date is required"),
    check("endDate")
        .exists({ checkFalsy: true })
        .isDate()
        .withMessage("End date is required"),
    handleValidationErrors
]

//get all current user's bookings
router.get('/current', requireAuth, async(req, res) => {
    // const userId = req.user.id;
    const user = await User.findByPk(req.user.id);

    const bookings = await Booking.findAll({
        where: { userId: user.id },
        include: [{ 
            model: Spot, 
            include: [{ model: SpotImage }],
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        }],
    });

    let bookingsArray = [];
    bookings.forEach((booking) => {
        bookingsArray.push(booking.toJSON());
    });
    
    bookingsArray.forEach((booking) => {
        booking.Spot.SpotImages.forEach((image) => {
            if(image.preview === true) {
                booking.Spot.previewImage = image.url;
            }
        });

        delete booking.Spot.SpotImages;
    });
        
    return res.status(200).json({ Bookings: bookingsArray });
});

//edit a booking
router.put('/:bookingId', requireAuth, async(req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const { startDate, endDate } = req.body;

    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate);

    if(newStartDate >= newEndDate) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "End date cannot come before or be the same as start date"
            }
        });
    };

    const booking = await Booking.findByPk(bookingId);
    
    if(booking) {
        if(booking.userId === userId) {
            const newDate = new Date();
            if(booking.endDate > newDate) {
                const existingBooking = await Booking.findOne({
                    where: {
                        spotId: booking.spotId,
                        [Op.or]: [
                            {
                                startDate: {
                                    [Op.between]: [newStartDate, newEndDate],
                                },
                            },
                            {
                                endDate: {
                                    [Op.between]: [newStartDate, newEndDate],
                                },
                            },
                        ],
                        id: {
                            [Op.ne]: booking.id, //this does not include current booking when checking
                        },
                    },
                });
            
                if(!existingBooking) {
                    booking.startDate = startDate;
                    booking.endDate = endDate;
                    await booking.save();
        
                    return res.status(200).json(booking);
                } else {
                    return res.status(403).json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        errors: {
                            "startDate": "Start date conflicts with an existing booking",
                            "endDate": "End date conflicts with an existing booking"
                        }
                    });
                }
            } else {
                return res.status(403).json({ message: "Past bookings can't be modified" });
            }
        } else {
            return res.status(403).json({ message: "You are not authorized to edit this booking" });
        }
    } else {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }
});

//delete a booking
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId, {
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    if(booking) {
        if(booking.userId === userId) {
            const currentDate = new Date();
            if(booking.startDate > currentDate) {
                await booking.destroy();

                return res.status(200).json({ message: "Successfully deleted" });
            } else {
                return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
            }
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this booking" });
        }
    } else {
        return res.status(404).json({ message: "Booking couldn't be found" })
    }
});

module.exports = router;