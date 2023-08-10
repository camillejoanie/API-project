const express = require('express');
const { Review, User, Spot, ReviewImage } = require('../../db/models');

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
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'],
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url'],
            },
        ],
    });

    return res.status(200).json({ Reviews: reviews });
    // const userId = req.user.id;
    // const reviews = await Review.findAll({
    //     where: { userId },
    // });
    // res.json(reviews);
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

    // if(!review) {
    //     return res.status(404).json({ message: "Review couldn't be found" });
    // };

    // if(review.ReviewImages.length >= 10) {
    //     return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    // };

    const { url } = req.body;

    const newImage = await ReviewImage.create({
        reviewId,
        url,
    });
    
    return res.status(200).json(newImage);
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