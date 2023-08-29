const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

//CREATE
router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);

    }catch(err){
        console.log(err)

    }

})



//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET Product
router.get("/find/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL Product and New Product
router.get("/findall", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Search
router.get("/searchs", async (req, res) => {
  const qSearch = req.query.search;

  try {
    let products;

    products = await Product.find({
      title: {
        $regex: qSearch,
        $options: "i",
      },
    });


    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
