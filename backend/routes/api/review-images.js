const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");

const { User } = require("../../db/models");
const { SpotImage } = require("../../db/models");
const { Spot } = require("../../db/models");
const { Review } = require("../../db/models");
const { ReviewImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//deletes an image
router.delete("/:imageId", async (req, res) => {
    const userId = req.user.id

    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: {
            model: Review,
        }
    })
    if(!reviewImage) {
        res.status(404)
        return res.json({
            "message": "Image couldn't be found"
          })
    }
    const reviewImageUserId = reviewImage.Review.userId

    if(userId === reviewImageUserId) {
        await reviewImage.destroy();
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
