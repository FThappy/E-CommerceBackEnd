const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
  }
});
// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    console.log(err);
  }
});
//Update Status
router.put("/status/:id", verifyTokenAndAdmin, async (req, res) => {
  
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: req.body.status, // Cập nhật thuộc tính active
        },
      },
      { new: true }
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    console.log(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Has Been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET USER Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.userId });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});
// //GET ALL

router.get("/findall", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const orders = query
      ? await Order.find().sort({ createdAt: -1 }).limit(5)
      : await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// GET MONTHLY INCOME

router.get("/income",verifyTokenAndAdmin,async(req,res)=>{

    const productId = req.query.pid
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try{
        const income = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: previousMonth },
              status: "Approved",
              ...(productId && {
                products: { $elemMatch: { productId: productId } },
              }),
            },
          },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: "$sales" },
            },
          },
        ]);
        res.status(200).json(income)

    }catch(err){
         console.log(err)
    }
})
router.get("/sales", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          status: "Approved",
          ...(productId && {
            products: { $elemMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
  }
});
// GET MONTHLY Quantity
router.get("/quantity", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
          products: "$products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$month",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
  }
});
// GET MONTHLY Quantity Product
router.get("/quantitys", verifyTokenAndAdmin, async (req, res) => {

  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId: productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          quantity: "$amount",
          products: "$products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          month: "$month",
          quantity: "$products.quantity",
          productId: "$products.productId",
        },
      },
      {
        $match: {
          productId: productId,
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$quantity" },
        },
      },
      
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
// GET MONTHLY Quantity Product All
router.get("/salesquantity", verifyTokenAndAdmin, async (req, res) => {

  const date = new Date();
  try {
    const income = await Order.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          quantity: "$amount",
          products: "$products",
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;


