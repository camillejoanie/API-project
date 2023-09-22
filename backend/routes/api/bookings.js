const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { User } = require("../../db/models");
const { Spot } = require("../../db/models");
const { Booking } = require("../../db/models");
const { SpotImage } = require("../../db/models")

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validBooking = [
    check("startDate")
      .exists({ checkFalsy: true })
      .withMessage("Must include a start date"),
    check("endDate")
      .exists({ checkFalsy: true })
      .withMessage("Must include a end date"),
  ]

//geta current users bookings
router.get('/current', async (req, res) => {
    const userId = req.user.id;
    const userBookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Spot,
                attirbutes: [
                    "id",
                    "ownerId",
                    "address",
                    "city",
                    "state",
                    "country",
                    "lat",
                    "lng",
                    "name",
                    "price",
                  ],
                  include: { model: SpotImage, attributes: ["url"] },
            },
        ],
    })

    if(userBookings.length === 0) {
        res.status(404)
        res.json({"message": "Could not find any booking for this user"})
    } else {
        let userBookingsList = [];
        userBookings.forEach((booking) => {
          userBookingsList.push(booking.toJSON());

        });
        let formattedUsersBookingList = []

        userBookingsList.forEach(booking => {
          if(!booking.Spot.SpotImages) {
            booking.Spot.previewImage = "This spot currently has no images"
          } else {
            booking.Spot.SpotImages.forEach(image => {
              booking.Spot.previewImage = image.url
            })

            const formattedBooking = {
                  id: booking.id,
                  spotId: booking.spotId,
                  Spot: {
                    id: booking.Spot.id,
                    ownerId: booking.Spot.ownerId,
                    address: booking.Spot.address,
                    city: booking.Spot.city,
                    state: booking.Spot.state,
                    country: booking.Spot.country,
                    lat: booking.Spot.lat,
                    lng: booking.Spot.lng,
                    name: booking.Spot.name,
                    price: booking.Spot.price,
                    previewImage: booking.Spot.previewImage
                  },
                  userId: booking.userId,
                  startDate: booking.startDate,
                  endDate: booking.endDate,
                  createdAt: booking.createdAt,
                  updatedAt: booking.updatedAt

               }
               formattedUsersBookingList.push(formattedBooking)
            }
          })


    return res.json({"Bookings": formattedUsersBookingList})

    }
})


//edit a booking
router.put('/:bookingId', validBooking, async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);


    if(booking) {
        const userId = req.user.id;
        const bookingOwnerId = booking.userId;
        if (userId === bookingOwnerId) {
            const { newStartDate, newEndDate } = req.body
            const currentDate = new Date();
            const bookingEndDate = booking.endDate
            if(currentDate >= bookingEndDate) {
                res.status(400)
                return res.json({ message: "You cannot edit a past booking" })
            }
            const editedBooking = {
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                ownerId: booking.ownerId,
                startDate: newStartDate || booking.startDate,
                endDate: newEndDate || bookingEndDate,
                createdAt: booking.createdAt,
                updatedAt: currentDate
            }

            return res.json(editedBooking)
        } else {
            res.status(404);
            res.json({ message: "You do not have permission to edit this booking" });
        }
    } else {
        res.status(404);
        res.json({ message: "Booking could not be found" });
    }
})


//deletes a booking
router.delete("/:bookingId", async (req, res) => {
    const booking = await Booking.findByPk(req.params.bookingId);
    const userId = req.user.id
    if(!booking) {
        res.status(404)
        res.json({
            "message": "Booking couldn't be found"
        })
    }
    const bookingOwnerId = booking.ownerId
    const bookingUserId = booking.userId
    const startDate = booking.startdate

    const currentDate = new Date;
    if (currentDate >= startDate) {
        res.status(403)
        res.json(    {
            "message": "Bookings that have been started can't be deleted"
          })
    }
    if(userId === bookingUserId ||userId === bookingOwnerId) {
        await booking.destroy();
        res.json(    {
            "message": "Successfully deleted"
          })
    } else {
        res.status(403)
        res.json(    {
            "message": "You do not have permission to delete this booking"
          })
    }
  });


  module.exports = router;
