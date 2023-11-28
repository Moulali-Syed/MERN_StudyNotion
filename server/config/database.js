const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('db connection successful'))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};
