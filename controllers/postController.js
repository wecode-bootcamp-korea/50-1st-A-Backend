const postService = require("../services/postService");

// 게시글 생성
const postAdd = async(req, res) => {
    try{
        const {id, title, content, userId} = req.body;
        console.log(req.body);

        //key value 검증
        if(!id || !title || !content || !userId){
            return res.status(400).json({message : "KEY_ERROR"});   
        }
        await postService.postAdd(id, title, content, userId);
        return res.status(200).json({message : "postCreated"});

    }catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}
// 게시글 조회
const postSelect = async(req, res) => {
    try{
        const result = await postService.postSelect();
        res.status(200).json({result})
    }catch(err){
        res.status(500).json({message : err.message});
    }

}

// 유저 게시글 조회
const postUserSelect = async(req, res) => {
    try{
        const id = req.query.id;
        if(!id){
            return res.status(400).json({message : "KEY_ERROR"});
        }

        const result = await postService.postUserSelect(id);
        res.status(200).json({result});
        
    }catch(err){
        res.status(500).json({message : err.message});
    }
}

//유저 게시글 수정 
const postUpdate = async(req, res) =>{
    try{
        const id = req.body.id
        console.log(id);
        if(!id){
            return res.status(400).json({message : "KEY_ERROR"});
        }
        // ID 값으로 Update
        await postService.postUpdate(id);

        // ID 값으로 update 된 게시글 불러오기
        const result = await postService.postUserSelect(id);
        res.status(200).json({result});

    }catch(err){
        res.status(500).json({message : err.message});
    }
}


//게시글 삭제하기
const postDelete = async(req, res) => {
    try{
        const id = req.body.id;
        console.log(id);
        if(!id){
            return res.status(400).json({message : "KEY_ERROR"});
        }
         await postService.postDelete(id);
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
    postAdd,
    postSelect,
    postUserSelect,
    postUpdate,
    postDelete,
    postLike
}