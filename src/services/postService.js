const postDao = require("../models/postDao");

//게시글 생성
const postCreate = async(userId, nickname, content, createdAt, updatedAt) => {

    const postCreate = await postDao.postCreate(
        userId,
        content
    )
    return postCreate;
}

// 게시글 조회
const selectPost = async() => {
    const selectPost = await postDao.selectPost();
    return selectPost;
}

//유저 게시글 조회

const postUserSelect = async(user_id) => {
    const postOneUserSelect = await postDao.postOneUserSelect(user_id);
    return postOneUserSelect;
}

//유저 게시글 수정 및 불러오기

const postUpdate = async(user_id, nickname) => {
    const postUpdates = await postDao.postUpdates(user_id, nickname);
    return postUpdates
}

// 게시글 삭제

const postDelete = async(postId) => {
    console.log(postId)
    const postDeletes = await postDao.postDeletes(postId);
    return postDeletes
}

// 좋아요 누르기
const postLike = async(id, userId, postId) => {
    const postLikes = await postDao.postLikes(id, userId, postId);
    return postLikes;
}

module.exports ={
    postCreate, 
    selectPost,
    postUserSelect,
    postUpdate,
    postDelete,
    postLike
}