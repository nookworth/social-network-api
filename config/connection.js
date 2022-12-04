const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://localhost:27017/social_network_DB")
.then(async () => {
  console.log("CONNECTED")
}); 

module.exports = connection;
