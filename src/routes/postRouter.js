const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const auth = require("../middlewares/auth");

//게시글 생성
router.post("/postCreate", auth.verfityToken ,postController.postCreate)

//게시글 조회
router.get("/selectPost",  postController.selectPost);

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
