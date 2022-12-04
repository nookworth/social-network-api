const router = require("express").Router();
const { User, Thought } = require("../../models/");

// Get all users
router.get("/", async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Get a single user by _id
router.get("/:id", async (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

//Create a new user
router.post("/", async (req, res) => {
  const { username, email } = req.body;
  User.create(
    { username: req.body.username, email: req.body.email },
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Update a user
router.put("/:id", async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.id },
    { username: req.body.username, email: req.body.email },
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

// Delete a user and also all associated thoughts
router.delete("/:id", async (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((user) => {
      return Thought.deleteMany({ username: user.username }, { new: true });
    })
    .then((thoughts) =>
      !thoughts
        ? res.status(404).json({
            message: "Error",
          })
        : res.json("Deleted the user and all their thoughts!")
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Add a friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
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

// Delete a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
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

// Add many users at once
router.post("/batch", async (req, res) => {
  User.insertMany(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err, { message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Delete all users
router.delete("/", async (req, res) => {
  User.deleteMany({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
