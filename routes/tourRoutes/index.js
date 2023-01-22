const express = require("express");
const {
  createTour,
  getTour,
  updateTour,
  bulkUpdateTour,
  tourDelete,
  bulkDeleteTour,
} = require("../../controllers/ToutController");
const router = express.Router();

router.route("/bulk-update-tour").patch(bulkUpdateTour);
router.route("/bulk-delete-tour").delete(bulkDeleteTour);
router.route("/").get(getTour).post(createTour);
router.route("/:id").patch(updateTour).delete(tourDelete);

module.exports = router;
