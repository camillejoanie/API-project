const express = require("express");


const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, sequelize } = require("../../db/models");
const { Spot } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Review } = require("../../db/models");
const { ReviewImage } = require("../../db/models")
const { Booking } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateSpotImage = [
  check("spotId").exists({ checkFalsy: true }),
  check("url").exists({ checkFalsy: true }),
];

const validReview = [
  check("spotId").exists({ checkFalsy: true }),
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({min:0, max:5})
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Must include a start date"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("Must include a end date"),
  handleValidationErrors,
];

const getPagination = (queryParams) => {
  let { page, size } = queryParams
  console.log(page, size)
  if (!size) size = 20
  if (!page) page = 1

  let pagination = {}
  if (page >= 1 && size >= 1) {
      pagination.limit = size
      pagination.offset = size * (page - 1)
  }
  return pagination
}

const paginationMiddleware = (req, res, next) => {
  let { page, size } = req.query

  if (!size) size = 20
  if (!page) page = 1

  let pagination = {}
  if (page >= 1 && size >= 1) {
      pagination.limit = size
      pagination.offset = size * (page - 1)
  }
  req.pagination = pagination
  next()
}

//Create a spot
router.post("/", validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;
  const spot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  const validSpot = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
  };
  if(validSpot){
    return res.json(validSpot);
} else {
  return
}
});

//create a review based on spotId
router.post("/:spotId/reviews", validReview, async (req, res) => {
  const { review, stars } = req.body;
  const userId = req.user.id;

  const spotId = req.params.spotId;
  const spot = await Spot.findAll({
    where: {
      id: spotId,
    },
  });

  if (!spot.length) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }

  if (!review.length) {
    res.status(400);
    return res.json({ messaage: "Review text is required" });
  }
  if (stars > 5 || stars < 1) {
    res.status(400);
    return res.json({ messaage: "Stars must be an integer from 1 to 5" });
  }
  const userReviews = await Review.findAll({
    where: {
      userId: userId,
      spotId: spotId
    },
  });
  if (userReviews.length > 0) {
    res.status(403);
    return res.json({
      message: "User already has a review for this spot",
    });
  }

  const newReview = await Review.create({ userId, spotId, review, stars });

  const validReview = {
    id: newReview.id,
    userId: userId,
    spotId: spotId,
    review: newReview.review,
    stars: newReview.stars,
    createdAt: newReview.createdAt,
    updatedAt: newReview.updatedAt,
  };

  return res.json(validReview);
});

//creates a booking based on spotId
router.post('/:spotId/bookings', validBooking, async (req, res) => {
  const { startDate, endDate} = req.body

  if(startDate > endDate) {
    res.status(400)
    res.json(
      {
        "message": "Bad Request",
        "errors": {
          "endDate": "endDate cannot come before startDate"
        }
      }
    )
  }

  const userId = req.user.id;
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId, {
    include: {
      model: Booking
    }
  }
  );

  if (!spot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }

  bookingsList = []
  spot.Bookings.forEach(booking => {
    bookingsList.push(booking.toJSON())
  })
  bookingsList.forEach(booking => {
    bookingStartDate = booking.startDate
    bookingEndDate = booking.endDate

    let startDateFormat = new Date(startDate)
    let endDateFormat = new Date(endDate)


    if(startDateFormat >= bookingStartDate && startDateFormat <= bookingEndDate){
      res.status(403)
      res.json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "errors": {
          "startDate": "Start date conflicts with an existing booking"
        }
      })}

      if(endDateFormat >= bookingStartDate && endDateFormat <= bookingEndDate) {
        res.status(403)
        res.json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "errors": {
            "startDate": "End date conflicts with an existing booking"
          }
        })}
  })

  const newBooking = await Booking.create({ spotId, userId, startDate, endDate})

  const validBooking = {
    id: newBooking.id,
    spotId: spotId,
    userId: userId,
    startDate: newBooking.startDate,
    endDate: newBooking.endDate,
    createdAt: newBooking.createdAt,
    updatedAt: newBooking.updatedAt
  }
  res.status(201)
  return res.json(validBooking)
})


//gets all spots
router.get("/", paginationMiddleware, async (req, res) => {
  console.log(req.query)
  const spots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ],
    ...getPagination(req.query)
  });
  const { page, size } = req.query

  //takes each spot and makes it json
  spotsList = []
  spots.forEach(spot => {
    spotsList.push(spot.toJSON())
  })

  //takes json spotlist, checks for reviews, averages all reviw stars for spot
  //and adds preview image
  spotsList.forEach(spot => {
    let spotRatings = 0
    let length = 0
    if(!spot.Reviews.length) {
      spot.avgRating = "This spot currently has no reviews"
    } else {
      spot.Reviews.forEach(review => {
        spotRatings += review.stars
        length ++
      })

      avgRating = spotRatings / length
      spot.avgRating = avgRating
    }
    spot.SpotImages.forEach(image => {
      if(image.preview === true) {
        return spot.previewImage = image.url
      }
    })
  })

  const formattedSpotResponses = []
  spotsList.forEach(spot => {
    let formattedSpotResponse = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.avgRating,
      previewImage: spot.previewImage
    }
    formattedSpotResponses.push(formattedSpotResponse)
  })


  return res.json({"Spots": formattedSpotResponses, "page": page, "size": size});


});

//gets all spots based on current user
router.get("/current", async (req, res) => {
  const userId = req.user.id;
  const usersSpots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review
      }
    ]
  });
  if (usersSpots) {
    let userSpotsList = []
    usersSpots.forEach(spot => {
      userSpotsList.push(spot.toJSON())
    })

    let formattedSpotList = []
    userSpotsList.forEach(spot => {
      if(!spot.Reviews.length) {
        spot.avgRating = "This spot currently has no reviews"
      } else {
        let spotRatings = 0
        let length = 0
        spot.Reviews.forEach(review => {
          spotRatings += review.stars
          length ++
        })

        avgRating = spotRatings / length
        spot.avgRating = avgRating

      }

      if(!spot.SpotImages.length) {
        spot.previewImage = "This spot currently has no images"
      } else {
        spot.SpotImages.forEach(image => {
          spot.previewImage = image.url
        })
      }
      const formattedSpot = {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          description: spot.description,
          price: spot.price,
          createdAt: spot.createdAt,
          updatedAt: spot.updatedAt ,
          numReviews: spot.numReviews,
          avgRating: spot.avgRating,
          previewImage: spot.previewImage,
        }
        formattedSpotList.push(formattedSpot)
    })

    res.json({"Spots": formattedSpotList});
  } else {
    res.json({ message: "You do not currently have any spots" });
  }
});

//returns all reviews based on spotID
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(req.params.spotId)

  if(!spot) {
    res.status(404)
    return res.json( { "message": "Spot could not be found" })
  }
  const spotReviews = await Review.findAll({
    where: {
      spotId: spotId
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  })

  if (spotReviews.length >= 1) {
    res.status(200)
    return res.json({"Reviews": spotReviews});
  } else {
    res.status(399);
    return res.json({ message: "This spot has no reviews" });

  }
})

//returns all bookings for a spot based on spotId
router.get('/:spotId/bookings', async (req, res) => {
  const spotId = req.params.spotId
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot) {
    res.status(404)
    res.json( { "message": "Spot could not be found" })
  }
  const ownerSpotBookings = await Booking.findAll({
    where: {
      spotId: spotId
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }

    ]
  })


  const userSpotBookings = await Booking.findAll({
    where: {
      spotId: spotId
    },
    attributes: ['spotId', 'startDate', 'endDate']
  })

  if (ownerSpotBookings) {
    const ownerId = spot.ownerId
    const userId = req.user.id
    if(ownerId === userId ) {
        res.status(200)
        return res.json({"Bookings": ownerSpotBookings});
    } else if (ownerId !== userId) {
      res.status(200)
      return res.json({"Bookings": userSpotBookings});
    }

  } else {
    res.status(404);
    return res.json({ message: "This spot has no bookings" });

  }
})

//return spot based on spot ID
router.get("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: Review,
      }
    ],
  });
  if (spot) {
      let jsonSpot = spot.toJSON()
      if(!jsonSpot.Reviews.length) {
        jsonSpot.avgRating = "This spot currently has no reviews"
      } else {
        let spotRatings = 0
        let length = 0
        jsonSpot.Reviews.forEach(review => {
          spotRatings += review.stars
          length ++
        })

        avgRating = spotRatings / length
        jsonSpot.avgStarRating = avgRating
        jsonSpot.numReviews = length
      }
      console.log(jsonSpot)

      const formattedSpot = {
          id: jsonSpot.id,
          ownerId: jsonSpot.ownerId,
          address: jsonSpot.address,
          city: jsonSpot.city,
          state: jsonSpot.state,
          country: jsonSpot.country,
          lat: jsonSpot.lat,
          lng: jsonSpot.lng,
          name: jsonSpot.name,
          description: jsonSpot.description,
          price: jsonSpot.price,
          createdAt: jsonSpot.createdAt,
          updatedAt: jsonSpot.updatedAt ,
          numReviews: jsonSpot.numReviews,
          avgStarRating: jsonSpot.avgStarRating,
          SpotImages: jsonSpot.SpotImages,
          Owner: jsonSpot.User
          }

      res.json(formattedSpot);
  } else {
    res.status(404);
    res.json({ message: "Spot couldn't be found" });
  }
});

//adds image to a spot if user is signed in and owner of spot
router.post("/:spotId/images", validateSpotImage, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  const { url, preview } = req.body;

  if (spot) {
    const userId = req.user.id;
    const ownerId = spot.ownerId;
    if (userId === ownerId) {
      const spotImage = await SpotImage.create({ spotId, url, preview });
      const validSpotImage = {
        id: spotImage.id,
        url: spotImage.url,
        preview: true,
      };

      return res.json(validSpotImage);
    } else {
      res.status(399);
      res.json({
        message: "You do not have permission to add an image to this spot",
      });
    }
  } else {
    res.status(404);
    res.json({ message: "Spot couldn't be found" });
  }
});

//edit a spot
router.put("/:spotId", validateSpot, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (spot) {
    const userId = req.user.id;
    const ownerId = spot.ownerId;
    if (userId === ownerId) {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      } = req.body;
      const currentDate = new Date();

      const editedSpot = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: address || spot.address,
        city: city || spot.city,
        state: state || spot.state,
        country: country || spot.country,
        lat: lat || spot.lat,
        lng: lng || spot.lng,
        name: name || spot.name,
        description: description || spot.description,
        price: price || spot.price,
        createdAt: spot.createdAt,
        updatedAt: currentDate,
      };

      await spot.update(editedSpot)


      res.json(editedSpot);
    } else {
      res.status(399);
      res.json({ message: "You do not have permission to edit this spot" });
    }
  } else {
    res.status(404);
    res.json({ message: "Spot couldn't be found" });
  }
});

//deletes a spot
router.delete("/:spotId", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const userId = req.user.id
  if(!spot) {
    res.status(404)
    res.json({
      "message": "Spot couldn't be found"
    })
  }
  const spotUserId = spot.ownerId
  if(userId === spotUserId) {
      await spot.destroy();
      res.json(    {
          "message": "Successfully deleted"
        })
  } else {
      res.status(403)
      res.json(    {
          "message": "You do not have permission to delete this spot"
        })
  }
});

module.exports = router;
