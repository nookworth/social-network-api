const router = require("express").Router();
const { User } = require("../../models");

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
