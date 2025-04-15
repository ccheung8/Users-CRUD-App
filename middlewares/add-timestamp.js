function addTimestamp(req, res, next) {
  req.timestamp = new Date().toISOString();
  next();
}

export default addTimestamp;