const postService = require("../services/postService");

// 게시글 생성
const postCreate = async(req, res) => {
    try{
        const {userId, nickname, content, createdAt, updatedAt} = req.body;
        console.log(req.body);

        //요청값 검증 -> 없으면 null
        if(!userId || !nickname || !content || !createdAt || !updatedAt){
            return res.status(400).json({message : "KEY_ERROR"});   
        }
        await postService.postCreate(userId, nickname, content, createdAt, updatedAt);
        return res.status(200).json({message : "postCreated"});

    }catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}
// 게시글 조회
const selectPost = async(req, res) => {
    try{
        const result = await postService.selectPost();
        if(!result) {
            return res.status(200).json({});
        }else{
            return res.status(200).json({result})
        }
    }catch(err){
        return res.status(500).json({message : err.message});
    }

}

// 유저 게시글 조회
const postUserSelect = async(req, res) => {
    try{
        const user_id = req.query.user_id;
        console.log(user_id)
        if(!user_id){
            return res.status(400).json({message : "KEY_ERROR"});
        }

        const result = await postService.postUserSelect(user_id);
        res.status(200).json({result});
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

//유저 게시글 수정 
const postUpdate = async(req, res) =>{
    try{
        const {user_id, nickname} = req.body;

        if(!user_id || !nickname){
            return res.status(400).json({message : "KEY_ERROR"});
        }
        // // ID와 nickname 값으로 Update
        // await postService.postUpdate(user_id, nickname);

        // ID와 nickname 값으로 update 된 게시글 불러오기
        const result = await postService.postUserSelect(user_id);
        await postService.postUpdate(user_id, nickname);
        res.status(200).json({result});

    }catch(err){
        res.status(500).json({message : err.message});
    }
}


//게시글 삭제하기
const postDelete = async(req, res) => {
    try{
        const postId = req.body.postId;
        console.log(postId);
        if(!postId){
            return res.status(400).json({message : "KEY_ERROR"});
        }
         await postService.postDelete(postId);
         return res.status(200).json({message : "postingDeleted"});
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

// 좋아요 누르기
const postLike = async(req, res) => {
    try{
        const {id, userId, postId}  = req.body;
        console.log(id, userId, postId);

        if(!id || !userId || !postId){
            res.status(400).json({message : "KEY_ERROR"});
        }
        await postService.postLike(id, userId, postId);
        return res.status(200).json({message : "likeCreated"});

    }catch(err){
        res.status(500).json({message : err.message});
    }
}

module.exports ={
    postCreate,
    selectPost,
    postUserSelect,
    postUpdate,
    postDelete,
    postLike
}