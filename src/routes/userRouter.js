const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


//유저 생성
router.post("/signup", userController.signUp);

//로그인
router.post("/login",  userController.login);


module.exports = {
    router
}
