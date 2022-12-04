const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    // id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Uses mongoose.model() to create model
const User = model("User", userSchema);

const handleError = (err) => console.error(err);

// User.create({ username: "nookworth", email: "nooksack@gmail.com" }, (err) =>
//   err ? handleError(err) : console.log("Created new document")
// );

module.exports = User;
