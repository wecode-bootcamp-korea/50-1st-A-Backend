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

const signUp = async (nickname, email, hashedpassword) => {
  try {
    console.log(hashedpassword);
    const result =  await appDataSource.query(
      `
    insert into users (nickname , email , password) values (?,?,?)
    `,
      [nickname, email, hashedpassword]
    );
    console.log(result);
    return result;
  } catch (error) {
    const err = new Error("Data insert error");
    err.status = 500;
    throw err;
  }
};

const login = async (email) => {
  try {
    const result =  await appDataSource.query(
      `
    select * from users where email = ?
    `,
      [email]
    );
    return result;
  } catch (error) {
    const err = new Error("Data read error");
    err.status = 500;
    throw err;
  }
};

module.exports = {
  signUp,
  login
}
