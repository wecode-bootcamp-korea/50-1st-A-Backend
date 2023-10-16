const postDao = require("../models/postDao");

//게시글 생성
const postAdd = async(id, title, content, userId) => {

    const createPost = await postDao.createPost(
        id,
        title,
        content,
        userId
    )
    return createPost;
}

// 게시글 조회
const postSelect = async() => {

    const postAllselect = await postDao.postAllselect();
    return postAllselect;
}

//유저 게시글 조회

const postUserSelect = async(id) => {
    const postOneUserSelect = await postDao.postOneUserSelect(id);
    return postOneUserSelect;
}

//유저 게시글 수정 및 불러오기

const postUpdate = async(id) => {
    const postUpdates = await postDao.postUpdates(id);
    return postUpdates
}

// 게시글 삭제

const postDelete = async(id) => {
    const postDeletes = await postDao.postDeletes(id);
    return postDeletes
}

// 좋아요 누르기
const postLike = async(id, userId, postId) => {
    const postLikes = await postDao.postLikes(id, userId, postId);
    return postLikes;
}

module.exports ={
    postAdd, 
    postSelect,
    postUserSelect,
    postUpdate,
    postDelete,
    postLike
}