const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    phone: { type: String },
    address: { type: String },
    floor: { type: String },
    letter: { type: String },
    cp: { type: String },
    city: { type: String },
    province: { type: String },
    photo: {
      type: String,
      default:
        "https://cdn.icon-icons.com/icons2/3868/PNG/512/profile_circle_icon_242774.png",
    },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
