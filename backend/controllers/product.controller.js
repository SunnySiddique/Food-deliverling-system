import Product from "../models/product.model.js";
import {
  deleteImageFromCloudinary,
  uploadToCloudinary,
} from "../utils/uploadToCloudinary.js";

const VALID_CATEGORIES = ["Pizza", "Burger", "Cake", "Drinks", "Pasta"];

const getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in [getProduct] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 5);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find({}).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Product.countDocuments({}),
    ]);

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error in [getProducts] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price, description, isAvailable } = req.body;

    const errors = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.push("Name is required and must be at least 2 characters");
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      errors.push(`Category must be one of: ${VALID_CATEGORIES.join(", ")}`);
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      errors.push("Price is required and must be a positive number");
    }
    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length < 10
    ) {
      errors.push("Description is required and must be at least 10 characters");
    }
    if (!req.file) {
      errors.push("Product image is required");
    }

    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, "products");

    // --- Save to database ---
    const newProduct = await Product.create({
      name: name.trim(),
      category,
      price: Number(price),
      description: description.trim(),
      imageUrl: result.url,
      imagePublicId: result.public_id,
      isAvailable: isAvailable === true || isAvailable === "true",
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error in [createProduct] controller:", error);

    if (error.code === "UPLOAD_TIMEOUT") {
      return res.status(504).json({
        success: false,
        message: "Image upload timed out. Please try again.",
      });
    }

    if (error.http_code === 403) {
      return res.status(502).json({
        success: false,
        message:
          "Cloudinary upload failed: permission denied. Please check your Cloudinary API key permissions.",
      });
    }

    if (error.http_code === 400) {
      return res.status(502).json({
        success: false,
        message: `Cloudinary rejected the image: ${error.message}`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create product. Please try again.",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, price, description, isAvailable } = req.body;
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const update = {};

    if (name !== undefined) update.name = name.trim();
    if (category !== undefined) update.category = category;
    if (price !== undefined) update.price = Number(price);
    if (description !== undefined) update.description = description.trim();
    if (isAvailable !== undefined) update.isAvailable = isAvailable;

    if (req.file?.buffer) {
      const [_, result] = await Promise.all([
        deleteImageFromCloudinary(product.imagePublicId),
        uploadToCloudinary(req.file.buffer, "products"),
      ]);

      update.imageUrl = result.secure_url;
      update.imagePublicId = result.public_id;
    }

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided to update" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, update, {
      new: true,
    });

    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Error in [updateProduct] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const [_, result] = await Promise.all([
      deleteImageFromCloudinary(product.imagePublicId),
      Product.findByIdAndDelete(productId),
    ]);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in [deleteProduct] controller:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};

export { createProduct, deleteProduct, getProduct, getProducts, updateProduct };
