const Tour = require("../Models/tourSchema");

exports.getTourService = async (filters, queries) => {
  /* 
        const result = await Tour.find({
        $or: [{ _id: "63cc1c0630474a5b142f1fff" }, {name: "cox-baraz"}],
        });
  
        const result = await Tour.find({
        name: { $ne: "cox-bazar" },
        });
  
        const result = await Tour.find({
        maxGroupSize: { $gt: 5 },
        });
  
        const result = await Tour.find({
        maxGroupSize: { $lte: 5 },
        });
      
        const result = await Tour.find({
        name: { $in: ["cox-baraz", "china"] },
        });
  
        const result = await Tour.find({}, '-name -maxGroupSize -price');
    
        const result = await Tour.find({}, 'name maxGroupSize price');
  
        const result = await Tour.find({}, 'name price').limit(4);
        const result = await Tour.find({}, "name maxGroupSize price ").sort({
          price: -1,
    maxGroupSize: -1,
  });
  return result;
};

  */
  console.log(filters, queries);
  const result = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fieldsBy)
    .sort(queries.sortBy);
  const totalTour = await Tour.countDocuments(filters);
  const pageCount = Math.ceil(totalTour / queries.limit);
  return { totalTour, length: result.length, pageCount, result };
};

// how to save script

/* 
exports.addTourService = async (data) => {
  const tours = [];
  for (let i = 0; i < 50; i++) {
    tours.push(
      new Tour({
        name: `fake tour ${i}`,
        duration: Math.floor(Math.random() * (20 - 4) + 4) ,
        maxGroupSize: Math.floor(Math.random() * (40 - 12) + 12),
        difficulty: "easy",
        price: 60 * Math.floor(Math.random() * (20 - 5) + 4),
        summary: "make a greate feeling",
        ratingsQuantity:Math.floor(Math.random() * (30 - 3) + 3),
        description:
        "who supervised the settlement there of Arakanese refugees from conquest by Myanmar (Burma) in 1799.",
        startDates: "20 jan 2023",
        status: i % 2 == 0 ? "hold" : "running",
        startLocation: "kosba",
        locations: {
          coordinates: 7987094245 + Math.floor(Math.random() * (20 - 5) + 4),
          address: "notor",
          description: "ghora-ghori",
          day: 5 + i,
        },
      }).save()
      );
    }
    const result = await Promise.all(tours);
    
    return result;
  };
  */

exports.updateTourService = async (productID, data) => {
  const result = await Tour.updateOne(
    { _id: productID },
    { $set: data },
    { runValidators: true }
  );

  /* 
    const tour = await Tour.findById(productID);
    const result = await tour.set(data).save();
*/
  return result;
};

exports.bulkUpdateTourService = async (data) => {
  const tours = [];
  data.ids.forEach((tour) => {
    tours.push(Tour.updateOne({ _id: tour.id }, tour.data));
  });
  const result = await Promise.all(tours);
  console.log(result);
  return result;
};

exports.deleteTourService = async (productID) => {
  const result = await Tour.deleteOne({ _id: productID });
  return result;
};

exports.bulkdeleteTourService = async (ids) => {
  const result = await Tour.deleteMany({});
  return result;
};

exports.detailsTourService = async (tourID) => {
  // const updated = await Tour.findOneAndUpdate({_id: tourID}, {$inc : {'viewCount' : 1}});
  const result = await Tour.findOne({ _id: tourID });
  if (result) {
    result.viewCount += 1;
    result.save();
  }
  return result;
};

exports.cheapestTourService = async () => {
  const result = await Tour.find({}).sort("price").limit(3);
  const totalTour = await Tour.countDocuments();
  return { totalTour, result };
};
exports.trendingTourService = async () => {
  const result = await Tour.find({}).sort("-viewCount").limit(3);
  return { result };
};
