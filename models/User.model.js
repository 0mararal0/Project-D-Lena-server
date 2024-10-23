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
        "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/09/569465-whatsapp-que-tus-contactos-ponen-rana-perfil.jpg?tf=3840x",
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
