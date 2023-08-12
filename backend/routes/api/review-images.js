const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();

//delete a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;

    const image = await ReviewImage.findByPk(imageId, {
        include: {
            model: Review,
            where: {
                userId: userId
            }
        }
    });

    if(image) {
        await image.destroy();

        return res.status(200).json({ message: "Successfully deleted" });
    } else {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }
})

module.exports = router;