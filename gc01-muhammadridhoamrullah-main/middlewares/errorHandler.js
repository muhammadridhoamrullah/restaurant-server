function errorHandler(error, req, res, next) {
  console.log(error, " <<<< error terbaru");
  if (error.name === "UNAUTHORIZED") {
    res.status(401).json({
      message: "PLEASE LOGIN FIRST",
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "INVALID TOKEN",
    });
  } else if (error.name === "FORBIDDEN") {
    res.status(403).json({
      message: "YOU HAVE NO ACCESS",
    });
  } else if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    let errors = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({ message: errors[0] });
  } else if (error.name === "EMAIL_PASSWORD_REQUIRED") {
    res.status(400).json({ message: "EMAIL OR PASSWORD IS REQUIRED" });
  } else if (error.name === "USERNOTFOUND") {
    res.status(404).json({ message: "USER NOT FOUND" });
  } else if (error.name === "DATANOTFOUND") {
    res.status(404).json({ message: "DATA NOT FOUND" });
  } else if (error.name === "INVALIDUSERANDPASS") {
    res.status(401).json({ message: "INVALID EMAIL OR PASSWORD" });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = errorHandler;
