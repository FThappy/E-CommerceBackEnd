const Banner = require("../models/Banner");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newBanner = new Banner(req.body);

  try {
    const savedBanner = await newBanner.save();
    res.status(200).json(savedBanner);
  } catch (err) {
    console.log(err);
  }
});
//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateBanner);
  } catch (err) {
    console.log(err);
  }
});
//UPDATE Active
router.put("/active/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          active: req.body.active, // Cập nhật thuộc tính active
        },
      },
      { new: true }
    );
    res.status(200).json(updateBanner);
  } catch (err) {
    console.log(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET Banner
router.get("/find/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //GET ALL

router.get("/findall", async (req, res) => {
  try {
    const banner = await Banner.find();
    res.status(200).json(banner);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;