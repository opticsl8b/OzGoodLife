const mongoose = require("mongoose");

const { Schema } = mongoose;

const productCartSchema = new Schema(
  {
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    },
    products: [
      {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount:{ type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports = ProductCart;
