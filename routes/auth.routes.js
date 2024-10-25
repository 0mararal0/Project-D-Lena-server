const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");

router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    floor,
    letter,
    cp,
    city,
    province,
    photo,
    isDeleted,
    role,
  } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (!regexPassword.test(password)) {
    res.status(400).json({
      message:
        "La contraseña debe tener al menos, una mayuscula, una minuscula, un numero y entre 8 y 16 caracteres",
    });
    return;
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/gm;
  if (!regexEmail.test(email)) {
    res.status(400).json({ message: "El e-mail no es válido" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ message: "Usuario ya registrado con ese email" });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phone,
      address,
      floor,
      letter,
      cp,
      city,
      province,
      photo,
      isDeleted,
      role,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password, role } = req.body;
  console.log(email, password, role);
  if (!email || !password) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(400).json({ message: "Usuario no encontrado con ese email" });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Contraseña no es correcta" });
      return;
    }
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      photo: foundUser.photo,
      firstName: foundUser.firstName,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_JWT, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    res.status(200).json({ authToken: authToken, role: foundUser.role });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", verifyToken, (req, res) => {
  console.log(req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
