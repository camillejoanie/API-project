const express = require('express');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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

//get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    // const userId = req.user.id;
    let user = await User.findByPk(req.user.id);

    const reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
            },
        ],
    });

    let reviewsArray = [];
    reviews.forEach((review) => {
        reviewsArray.push(review.toJSON());
    })

    reviewsArray.forEach((review) => {
        review.Spot.SpotImages.forEach((image) => {
            if(image.preview === true) {
                review.Spot.previewImage = image.url;
            }
        })
    })

    return res.status(200).json({ Review: reviewsArray });
});

//add image to review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId
        }
    });

    if(!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
    };

    const reviewImages = await ReviewImage.findAll();

    if(review.id === req.user.id && reviewImages.length >= 10) {
        return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    };

    const { url } = req.body;

    const newImage = await ReviewImage.create({
        reviewId,
        url,
    });

    const response = {
        id: newImage.id,
        url: newImage.url
    }
    
    return res.status(200).json(response);
});

//edit a review
router.put('/:reviewId', requireAuth, validateNewReview, async(req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Bad Request',
            errors: errors.array() 
        });
    };

    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId,
        },
    });

    if(review) {
        const { review: updatedReview, stars } = req.body;
    
        review.review = updatedReview;
        review.stars = stars;
    
        await review.save();
    
        return res.status(200).json(review);
    } else {
        return res.status(404).json({ message: "Review couldn't be found" });
    };
});

//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    const review = await Review.findOne({
        where: {
            id: reviewId,
            userId: userId
        }
    });

    if(review) {
        await review.destroy();

        return res.status(200).json({ message: "Successfully deleted" });
    } else {
        return res.status(404).json({ message: "Review couldn't be found" });
    };
});

module.exports = router;