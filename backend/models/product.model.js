import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Pizza", "Burger", "Cake", "Drinks", "Pasta"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      default: null,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", product);

export default Product;
