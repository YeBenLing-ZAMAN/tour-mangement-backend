const Tour = require("../../Models/tourSchema");
const {
  getTourService,
  addTourService,
  updateTourService,
  bulkUpdateTourService,
  deleteTourService,
  bulkdeleteTourService,
} = require("../../services/tour.services");

const createTour = async (req, res) => {
  try {
    const result = await addTourService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data saved successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "data is not inserted", error: err });
  }
};

const getTour = async (req, res) => {
  try {
    const result = await getTourService();

    res.status(200).json({
      status: "success",
      message: "Data saved successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "data is not inserted", error: err });
  }
};

const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateTourService(id, req.body);

    if (!result.modifiedCount) {
      res.status(400).json({
        status: "failed",
        message: "tour is not updated successfully",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Data saved successfully",
        data: result,
      });
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "data is not inserted", error: err });
  }
};

const bulkUpdateTour = async (req, res) => {
  try {
    const result = await bulkUpdateTourService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data saved successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", message: "data is not inserted", error: err });
  }
};

const tourDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteTourService(id);

    res.status(200).json({
      status: "success",
      message: "tour delete successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Not deleted! somethings wrong",
      error: err,
    });
  }
};

const bulkDeleteTour = async (req, res) => {
  try {
    const result = await bulkdeleteTourService(req.body.ids);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "success",
        error: "tours not delete",
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "tours delete successfully",
        data: result,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: "Not deleted! somethings wrong",
      data: err,
    });
  }
};

module.exports = {
  createTour,
  getTour,
  updateTour,
  bulkUpdateTour,
  tourDelete,
  bulkDeleteTour,
};
