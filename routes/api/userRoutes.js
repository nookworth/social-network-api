const router = require("express").Router();
const { User } = require("../../models/User");

router.get("/", async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/:id", async (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/", async (req, res) => {
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

module.exports = router;
