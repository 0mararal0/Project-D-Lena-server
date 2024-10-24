const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Product = require("./Product.model");

const orderSchema = new Schema(
  {
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pendiente", "enviado", "entregado"],
      default: "pendiente",
    },
    address: { type: String, required: true },
    floor: { type: String },
    letter: { type: String },
    cp: { type: String },
    city: { type: String, required: true },
    province: { type: String },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
