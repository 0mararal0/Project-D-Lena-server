const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    category: {
      type: String,
      enum: ["pizza", "pasta", "ensalada", "postre", "bebida"],
    },
    price: { type: Number, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
