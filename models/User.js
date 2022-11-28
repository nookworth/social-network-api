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
    // thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    // friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
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

const handleError = (err) => console.error(err);

// User.create({ username: "nookworth", email: "nooksack@gmail.com" }, (err) =>
//   err ? handleError(err) : console.log("Created new document")
// );

module.exports = User;
