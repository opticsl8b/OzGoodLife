const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    productscartID: {
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    },

    isFinalised :{
      type:Boolean,
    },

    purchasedDate:{

    },
    

  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
