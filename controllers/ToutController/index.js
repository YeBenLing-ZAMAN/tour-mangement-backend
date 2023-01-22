const Tour = require("../../Models/tourSchema");
const {
  getTourService,
  addTourService,
  updateTourService,
  bulkUpdateTourService,
  deleteTourService,
  bulkdeleteTourService,
  detailsTourService,
  cheapestTourService,
  trendingTourService,
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
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]); // how to delete fields form Object
    // console.log(filters);

    /* sort handle */
    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }

    /*  */
    if (req.query.fields) {
      const fieldsBy = req.query.fields.split(",").join(" ");
      queries.fieldsBy = fieldsBy;
    }

    /* gt, lt, gte, lte */
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    filters = JSON.parse(filterString);

    /* pagination */
    // 50 tour
    // page 1=> 1-10
    // page 2=> 11-20
    // page 3=> 21-30
    // page 4=> 31-40
    // page 5=> 41-50

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const result = await getTourService(filters, queries);

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

const detailsTour = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await detailsTourService(id);
    res.status(200).json({
      status: "success",
      message: "tour details found successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "tour details not found",
      error: err,
    });
  }
};

const cheapestTour = async (req, res) => {
  try {
    const result = await cheapestTourService();
    res.status(200).json({
      status: "success",
      message: "cheapest tour details found successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(400)
      .json({
        status: "failed",
        message: "cheapest tour details not found",
        error: err,
      });
  }
};

const trendingTour = async (req, res) => {
  try {
    const result = await trendingTourService();
    res.status(200).json({
      status: "success",
      message: "trending tour details found successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(400)
      .json({
        status: "failed",
        message: "trending tour details not found",
        error: err,
      });
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
  detailsTour,
  cheapestTour,
  trendingTour,
};
