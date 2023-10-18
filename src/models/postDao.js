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
const postCreate = async(userId, content) =>{
    try{
        return await myDataSource.query(
            `INSERT INTO threads(
                userId
                content
            ) VALUES (?, ?);
            `,
            [ userId, content ]
            );
    }catch(err){
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    };
}

//게시글 조회
const selectPost = async () => {
    try{
        return await myDataSource.query(
            `   
            select
                users.nickname,
                threads.content,
                threads.createdAt,
                threads.updatedAt
            from threads inner join users;  
            `);
    }catch(err){
        const error = new Error('SELECT ERROR');
        error.statusCode = 500;
        throw error;
    }
}


//유저 게시글 조회
const postOneUserSelect = async(user_id) =>{
    console.log(user_id);
    try{
        return await myDataSource.query(
            `
                select 
                    threads.id,
                    users.nickname,
                    users.profile_image,
                    threads.content,
                    threads.created_at
                from threads
                inner join users
                where threads.user_id = users.id and users.id = ?;
            `,
            [user_id]
            )
    }catch(err){
        const error = new Error("SELECT ERROR");
        console.log(err)
        error.statusCode = 500;
        throw error;
    }
}

// 게시글 수정
const postUpdates = async(user_id, nickname) =>{
    try{
        return await myDataSource.query(
            `
            update threads as t
            inner join users as u on t.user_id = ?
            set t.content = "수정된 내용입니다."
            where u.nickname = ?
            `,[user_id, nickname]
            );
    }catch(err){
        const error = new Error("UPDATE ERROR");
        error.statusCode = 500;
        throw error;
    }
}

//게시글 삭제
const postDeletes = async(postId) =>{   
    try{
        return await myDataSource.query(
            `
            delete from threads
            where user_id in (select id from users) and id = ?;
            `,[postId]
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
    postCreate,
    selectPost,
    postOneUserSelect,
    postUpdates,
    postDeletes,
    postLikes
}