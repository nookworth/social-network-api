const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: {} },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Uses mongoose.model() to create model
const User = mongoose.model("user", userSchema);

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
