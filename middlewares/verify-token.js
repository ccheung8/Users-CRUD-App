function verifyToken(req, res, next) {
  console.log("verify token function here");
  next();
  // const token = req.headers["Authorization"]
}

export default verifyToken;