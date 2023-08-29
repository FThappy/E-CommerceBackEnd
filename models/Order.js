const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, },
    products: [
      {
        productId: {
          type: String,
        },
        productImg: {
          type: String,
        },
        productName: {
          type: String,
        },
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number,  },
    address: { type: String,  },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
