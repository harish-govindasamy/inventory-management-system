import express from "express";
import ProductModel from "../models/product_model.js";
import HistoryModel from "../models/history_model.js";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/expiring", async (req, res) => {
  try {
    const { months = 1 } = req.query;  
    const expiringProducts = await getExpiringProducts(parseInt(months));
    res.status(200).json(expiringProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
const getExpiringProducts = async (months) => {
  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setMonth(expirationDate.getMonth() + months);

  const expiringProducts = await ProductModel.find({
    dateOfPurchase: { $lte: expirationDate }, 
  })
    .populate("createdBy")
    .populate({
      path: "history",
      populate: {
        path: "location",
      },
    })
    .populate("manufacturer"); 

  return expiringProducts;
};

analyticsRoutes.get("/", async (req, res) => {
  try {
    const useby = await getProductUsageByUser();
    const expiry = await getWarrantyStatus();
    const status = await getProductStatus();

    const analytics = { useby, expiry, status };

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to get product usage by user
const getProductUsageByUser = async () => {
  const result = await ProductModel.aggregate([
    {
      $group: {
        _id: "$user",
        count: { $sum: 1 },
      },
    },
  ]);

  const labels = result.map((item) => item._id);
  const data = result.map((item) => item.count);

  return { title: "Products used by", labels, data };
};

// Function to get warranty status
const getWarrantyStatus = async () => {
  const result = await ProductModel.aggregate([
    {
      $project: {
        status: {
          $cond: [
            { $lte: ["$dateOfPurchase", new Date()] },
            "in warranty",
            "not in warranty",
          ],
        },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const labels = result.map((item) => item._id);
  const data = result.map((item) => item.count);

  return { title: "Warranty", labels, data };
};
 
const getProductStatus = async () => {
  const result = await HistoryModel.aggregate([
    {
      $unwind: "$status",
    },
    {
      $group: {
        _id: "$status.name",
        count: { $sum: 1 },
      },
    },
  ]);

  const labels = result.map((item) => item._id);
  const data = result.map((item) => item.count);

  return { title: "Product Status", labels, data };
};

export default analyticsRoutes;
