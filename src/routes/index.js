const express = require("express");
const router = express.Router();


//localhost:3000/users/ --- 
const userRouter = require("./userRouter");
router.use("/users", userRouter.router);

//localhost:3000/posts/ --- 
const postRouter = require("./postRouter");
router.use("/posts", postRouter.router)


module.exports = router;