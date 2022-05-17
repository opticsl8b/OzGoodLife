const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      
    },
    image: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    size: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
