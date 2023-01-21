const express = require("express");
const { createTour, getTour,updateTour, bulkUpdateTour } = require("../../controllers/ToutController");
const router = express.Router();

router.route("/").get(getTour).post(createTour);
router.route("/bulk-update-tour").patch(bulkUpdateTour);
router.route("/:id").patch(updateTour);

module.exports = router;
