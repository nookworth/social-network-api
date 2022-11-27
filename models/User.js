const mongoose = require('mongoose');

// Child documents or subdocuments can be embedded into a parent document
// The bookSchema defines the schema of the subdocument
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true, $trim: {}, },
//   email: Number,
//   thoughts: ,
//   friends: ,
// });

// Uses mongoose.model() to create model
const User = mongoose.model('User', userSchema);

// Uses model to create new instance including subdocument
// const bookData = [
//   { title: 'Diary of Anne Frank', price: 10 },
//   { title: 'One Thousand Years of Solitude', price: 20 },
//   { title: 'History of Hogwarts', price: 5 },
// ];

// Library.create({ name: 'Books', books: bookData }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

module.exports = User;