const express = require('express');
const { SpotImage, Spot } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//delete a spot image
router.delete('/:imageId', requireAuth, async(req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    
    const image = await SpotImage.findByPk(imageId, {
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    if(image) {
        if(image.Spot.ownerId === userId) {
            await image.destroy();

            return res.status(200).json({ message: "Successfully deleted" });
        } else {
            return res.status(403).json({ message: "You are not authorized to delete this spot image" });
        }
    } else {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }
});

module.exports = router;