
const postDao = require("../models/postDao");
const userDao = require("../models/userDao");
const auth = require("../middlewares/auth");
const { loginUser } = require("../models/userDao");


//게시글 생성
const postCreate = async(nickname, content, user) => {
    
    const userEmamil = user.email;
    const userNickname = user.nickname;
    console.log(userEmamil, userNickname);
    
    //유저 검증
    const loginUser = await userDao.loginUser(
        userEmamil
    )
    
    const dbEmail = loginUser[0].email;
    const dbnickname = loginUser[0].nickname;

    if(userEmamil === dbEmail && userNickname === dbnickname){
        const postCreate = await postDao.postCreate(
            nickname,
            content
        )

        console.log("로그인 완료")
        return postCreate;
    }else{
        const error = new Error("검증된 유저가 아닙니다");
        error.statusCode = 500;
        throw error;
    }

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
    postLike,
}