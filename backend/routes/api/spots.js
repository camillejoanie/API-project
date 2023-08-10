const express = require('express');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const validateNewSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
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
    handleValidationErrors
];

const validateNewReview = [
    check("review")
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check("stars")
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    res.json(spots);
});

//create a spot
router.post('/', requireAuth, validateNewSpot, async (req, res) => { //do this when authentication needs to be true
    // try {
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

        const newSpot = await Spot.create({
            ownerId: req.user.id,
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
    res.status(201).json(newSpot);
});
    // } 
    // catch (error) {
        // if(error.name === 'SequelizeValidationError') {
        //     const validationErrors = {};
        //     error.errors.forEach(err => {
        //         validationErrors[err.path] = err.message;
        //     });
        //     return res.status(400).json({
        //         message: 'Bad Request',
        //         errors: validationErrors,
        //     });
    //     } 
    //     else {
//         console.error(error);
//         res.status(400).json({ 
//             message: 'Validation error',
//             statusCode: 400,
//             errors: {

//             }
//  });
//         }
    // }

//add an image to a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    // const { user } = req;
    // const { url, preview } = req.body;
    // const newSpot = await Spot.findByPk(req.params.spotId);

    // if(newSpot) {
    //     if(newSpot.ownerId === user.id) {
    //         const image = await newSpot.createSpotImage({
    //             url: url,
    //             preview: preview
    //         });

    //         await image.save();

    //         let response = {};
    //         response.id = image.id;
    //         response.url = image.url;
    //         response.preview = image.preview;

    //         res.json(response)
    //     }
    // } else if(!newSpot) {
    //     res.status(404).json({ message: "Spot couldn't be found" });
    // }
    const { user } = req;

    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if(!spot) {
        if(user.id !== spot.ownerId) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
    };

    // if(user.id !== spot.ownerId) {
    //     return res.status(403).json({ message: "Spot must belong to current user" });
    // };

    const { url, preview } = req.body;

    const newSpotImage = await SpotImage.create({
        spotId,
        url,
        preview
    });

    return res.status(201).json(newSpotImage);
});

//get all spots owned by the current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId: userId },
    });

    return res.status(200).json({ Spots: spots });
});

//get details of a spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ['id', 'url', 'preview'],
            },
            {
                model: Review,
                attributes: ['stars'],
            }
        ],
    });

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    const numReviews = spot.Reviews.length;
    const totalStars = spot.Reviews.reduce((total, review) => total + review.stars, 0);
    let avgStarRating = 0

    if(numReviews > 0) {
        avgStarRating = totalStars / numReviews;
    }

    return res.status(200).json({
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
        numReviews: numReviews,
        avgRating: avgStarRating,
        SpotImages: spot.SpotImages,
        Owner: spot.Owner
    });
});

//edit a spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res) => {
    // let spot = await Spot.findByPk(req.params.spotId);
    // let userId = req.user.id;

    // if(spot) {
    //     if(spot.ownerId === userId) {
    //         spot.address = req.body.address;
    //         spot.city = req.body.city;
    //         spot.state = req.body.state;
    //         spot.country = req.body.country;
    //         spot.lat = req.body.lat;
    //         spot.lng = req.body.lng;
    //         spot.name = req.body.name;
    //         spot.description = req.body.description;
    //         spot.price = req.body.price;
    //     } else {
    //         return res.status(403).json({ message: "User is not authorized" });
    //     }     
    // } else {   
    //         return res.status(404).json({ message: "Spot couldn't be found" });
    // }

    // return res.status(200).json(spot);
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: userId,
        }
    });

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    };

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
    
    await spot.update({
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

    return res.status(200).json(spot);
        // const updatedSpot = await Spot.findOne({
        //     where: {
        //         id: spotId,
        //         ownerId: userId,
        //     }
        // })
    // } catch (error) {
    //     console.error(error);

    //     if(error.name === 'SequelizeValidationError') {
    //         const validationErrors = error.errors.reduce((errorsObj, currentError) => {
    //             errorsObj[currentError.path] = currentError.message;
    //             return errorsObj;
    //         }, {});

    //         console.log('Validation errors:', validationErrors);

    //         return res.status(400).json({
    //             message: 'Bad Request',
    //             errors: validationErrors,
    //         })
    //     } 

    //     console.log('Error occured:', error);
    //     return res.status(500).json({ message: "Internal Server Error" });
    // }
});

//delete a spot
router.delete('/:spotId', requireAuth, async(req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findOne({
        where: {
            id: spotId,
            ownerId: userId,
        }
    });

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    await spot.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
});

//create a review for a spot based on spot id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findByPk(req.params.spotId);

    const existingReview = await Review.findOne({
        where: {
            userId,
            spotId,
        },
    });

    if(spot) {
        if(existingReview) {
            return res.status(500).json({ message: "User already has a review for this spot" });
        };

        if(!existingReview) {
            const { review, stars } = req.body;
            
            const newReview = await Review.create({
                userId,
                spotId: spot.id,
                review,
                stars,
            });

            return res.status(201).json(newReview);
        }   
    };

    return res.status(404).json({ message: "Spot couldn't be found" });
});

//get all reviews based on spot id
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;

    const reviews = await Review.findAll({
        where: { spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
            },
        ],
    });

    if (reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for the specified spot" });
    }

    return res.status(200).json({ Reviews: reviews });
});

module.exports = router;