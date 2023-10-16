const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

//게시글 등록 -> //localhost:3000/posts/postAdd 요청
router.post("/postAdd", postController.postAdd);

//게시글 조회
router.get("/postSelect", postController.postSelect);

//유저 게시글 조회
router.get("/postUserSelect", postController.postUserSelect);

//유저 게시글 수정
router.put("/postUpdate", postController.postUpdate);

//유저 게시글 삭제하기
router.delete("/postDelete", postController.postDelete);

// 좋아요 누르기
router.post("/postLike", postController.postLike);

module.exports = {
    router
}
