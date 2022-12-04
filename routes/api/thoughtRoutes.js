const router = require("express").Router();
const { User, Thought } = require("../../models/");

// Get all thoughts
router.get("/", async (req, res) => {
  Thought.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Get a single thought by _id
router.get("/:id", async (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ err, message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Create a new thought
router.post("/", async (req, res) => {
  const thoughtText = req.body.thoughtText;
  const username = req.body.username;
  console.log("HERE: ", thoughtText, username);
  Thought.create(
    { thoughtText: thoughtText, username: username },
    (err, result) => {
      if (err) {
        res.status(500).send({ err, message: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
  User.findOneAndUpdate(
    { username: username },
    { $addToSet: { thoughts: newThought } },
    (err, result) => {
      if (err) {
        res.status(500).send({ err, message: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

module.exports = router;
