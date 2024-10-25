const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  console.log(req.headers);

  try {
    const tokenArr = req.headers.authorization.split(" ");
    const token = tokenArr[1];
    const payload = jwt.verify(token, process.env.TOKEN_JWT);
    req.payload = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no valido o no existe" });
  }
}

function verifyAdmin(req, res, next) {
  if (req.payload.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "no eres admin, fuera de aqui" });
  }
}

module.exports = {
  verifyToken,
  verifyAdmin,
};
