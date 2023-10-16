const { DataSource } = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize().then(() =>{
    console.log("Data Source has been initialized!");
})
.catch((err) => {
    console.log("Error occurred during Data Source initialization", err);
});

//게시글 생성
const createPost = async( id, title, content, userId ) =>{
    try{
        return await myDataSource.query(
            `INSERT INTO posts(
                id,
                title,
                content,
                userId
            ) VALUES (?, ?, ?, ?);
            `,
            [ id, title, content, userId ]
            );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
}

//게시글 조회
const postAllselect = async () => {
    try{
        return await myDataSource.query(`select * from posts`);
    }catch(err){
        const error = new Error('SELECT ERROR');
        error.statusCode = 500;
        throw error;
    }
}


//유저 게시글 조회
const postOneUserSelect = async(id) =>{
    try{
        return await myDataSource.query(
            `select * from posts, users
                where userId = ?;
            `,
            [id]
            )
    }catch(err){
        const error = new Error("SELECT ERROR");
        error.statusCode = 500;
        throw error;
    }
}

// 게시글 수정
const postUpdates = async(id) =>{
    
    try{
        return await myDataSource.query(
            `
                update posts
                set content = "기존과 다르게 수정한 내용입니다2."
                where userId = ?;
            `,[id]);
    }catch(err){
        const error = new Error("UPDATE ERROR");
        error.statusCode = 500;
        throw error;
    }
}

//게시글 삭제
const postDeletes = async(id) =>{
    try{
        return await myDataSource.query(
            `
                delete from posts
                where userId = ?
            `,[id]
        )
    }catch(err){
        const error = new Error("UPDATE ERROR");
        error.statusCode = 500;
        throw error;
    }
}

//좋아요 누르기
const postLikes = async(id, userId, postId) => {
    try{
        return await myDataSource.query(
            `
            insert into postLike(
                id,
                userId,
                postId
            ) values (?, ?, ?);
            `,[id, userId, postId]
        )
    }catch(err){
        const error = new Error("INSERT ERROR");
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createPost,
    postAllselect,
    postOneUserSelect,
    postUpdates,
    postDeletes,
    postLikes
}