const mongoose = require('mongoose');
// const { connect, connection } = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/social_network_DB")
.then(async () => {
  console.log("CONNECTED")
}); 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

module.exports = connection;
