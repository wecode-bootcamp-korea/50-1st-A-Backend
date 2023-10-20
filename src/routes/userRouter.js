const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");


//유저 생성
router.post("/signup",userController.signUp);

//로그인
router.post("/login" ,userController.login);


module.exports = {
    router
}
