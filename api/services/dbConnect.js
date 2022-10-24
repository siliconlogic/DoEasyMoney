const mongoose = require("mongoose");

async function dbConnect() {
  if (mongoose.connection.readyState == 1) {
    return mongoose.connection.db;
  }

  let url = "mongodb://localhost:27017/doeasymoney";
  let options = {
    user: "admin5",
    pass:
      process.env.NODE_ENV.trim() === "development"
        ? process.env.MONGO_DEV_PASSWORD
        : process.env.MONGO_PRODUCTION_PASSWORD,
    auth: { authSource: "doeasymoney" },
  };
  return mongoose.connect(url, options, (e) => {
    console.error(e);
  });
}

module.exports = dbConnect;
