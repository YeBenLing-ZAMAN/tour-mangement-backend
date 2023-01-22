const express = require("express");
const {
  createTour,
  getTour,
  updateTour,
  bulkUpdateTour,
  tourDelete,
  bulkDeleteTour,
  detailsTour,
  cheapestTour,
  trendingTour,
} = require("../../controllers/ToutController");
const router = express.Router();

router.route("/bulk-update-tour").patch(bulkUpdateTour);
router.route("/bulk-delete-tour").delete(bulkDeleteTour);
router.route("/cheapest").get(cheapestTour);
router.route("/trending").get(trendingTour);
router.route("/").get(getTour).post(createTour);
router.route("/:id").get(detailsTour).patch(updateTour).delete(tourDelete);

module.exports = router;
