const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    ingredients: { type: String },
    category: {
      type: String,
      enum: ["pizza", "pasta", "ensalada", "postre", "bebida"],
      required: true,
    },
    price: { type: String, required: true },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
