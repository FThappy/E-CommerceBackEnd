const FeedBack = require("../models/FeedBack");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

//CREATE
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newFeedBack = new FeedBack(req.body);

  try {
    const savedFeedBack = await newFeedBack.save();
    res.status(200).json(savedFeedBack);
  } catch (err) {
    console.log(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await FeedBack.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/findall",verifyTokenAndAdmin, async (req, res) => {
  try {
    const feedback = await FeedBack.find();
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
