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
  Thought.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ err, message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Create a new thought and attach it to a user
router.post("/", async (req, res) => {
  const thoughtText = req.body.thoughtText;
  const username = req.body.username;
  Thought.create({ thoughtText, username })
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: username },
        { $addToSet: { thoughts: thought } },
        { new: true }
      );
    })
    .then((user) =>
      !user
        ? res.status(404).json({
            message: "Thought created, but found no user with that ID",
          })
        : res.json("Created the thought!")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a thought
router.put("/:id", async (req, res) => {
  const thoughtText = req.body.thoughtText;
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    { thoughtText },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Delete a thought
router.delete("/:id", async (req, res) => {
  Thought.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Create a new reaction
router.post("/:thoughtId/reactions", async (req, res) => {
  const reaction = req.body;
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: reaction } },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Delete a reaction
router.delete("/:thoughtId/reactions/", async (req, res) => {
  const reactionId = req.body.reactionId;
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId } } },
    { new: true },
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
