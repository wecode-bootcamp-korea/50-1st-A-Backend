const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

try {
  appDataSource.initialize().then(() => {
    console.log("Data Source has been initialized");
  });
} catch (err) {
  console.log(err);
}

// const threadId = async (userId) => {
//   try {
//     console.log("const threadId 부분 ", userId);
//     const result = await appDataSource.query(
//       `
//     select id from threads where user_id = ?;
//     `,
//       [userId]
//     );
//     console.log("threadId" , result);
//     return result;
//   } catch (error) {
//     const err = new Error("Data input error");
//     err.statusCode = 500;
//     throw err;
//   }
// };

const insertThread = async (content, userId) => {
  try {
    console.log("result:" + userId);
    const result = await appDataSource.query(
      `insert into threads (content , user_id) values (?,?);`,
      [content, userId]
    );
    return result;
  } catch (error) {
    console.log(error.message);
    const err = new Error("Data input error");
    err.statusCode = 500;
    throw err;
  }
};

const totalSelect = async () => {
  try {
    return await appDataSource.query(`
    select threads.* ,users.nickname as name, users.profile_image from threads join users on threads.user_id = users.id
    `);
  } catch (error) {
    const err = new Error("Data read error");
    err.statusCode = 500;
    throw err;
  }
};

const userSelect = async (userId) => {
  try {
    return await appDataSource.query(
      `
    select t.content from users u join threads t on u.id = t.user_id where u.id = ?
    `,
      [userId]
    );
  } catch (error) {
    const err = new Error("Data read error");
    err.statusCode = 500;
    throw err;
  }
};

const updateThread = async (content, threadId, userId) => {
  try {
    console.log(content, threadId, userId);
    return await appDataSource.query(
      `
    update threads set content = ? where id = ? and user_id = ?`,
      [content, threadId, userId]
    );
  } catch (error) {
    const err = new Error("Data update error");
    err.statusCode = 500;
    throw err;
  }
};

const deleteThread = async (threadId, userId) => {
  try {
    return await appDataSource.query(
      `
    delete from threads where id = ? and user_id = ?
    `,
      [threadId, userId]
    );
  } catch (error) {
    const err = new Error("Data delete error");
    err.statusCode = 500;
    throw err;
  }
};

const likes = async (userId, threadId) => {
  try {
    return await appDataSource.query(
      `
    insert into threads_likes (user_id, thread_id) values (?, ?)
    `,
      [userId, threadId]
    );
  } catch (error) {
    const err = new Error("Data insert error");
    err.statusCode = 500;
    throw err;
  }
};

module.exports = {
  insertThread,
  totalSelect,
  userSelect,
  updateThread,
  deleteThread,
  likes,
  // threadId,
};
