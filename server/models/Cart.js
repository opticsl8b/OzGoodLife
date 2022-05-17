const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: [
      {
        productID: {
          type: String,
          required: true,
        },
        quantity:{
            type:Number,
            default:1,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
