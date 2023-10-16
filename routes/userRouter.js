const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//유저 생성
router.post("/signup", userController.signUp);

//유저 조회 테스트
router.get("/select", userController.selectUser);



module.exports = {
    router
}

