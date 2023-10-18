//models/userDao.js

const { DataSource } = require('typeorm');
const path = require("path")
const envFilePaht = path.resolve(__dirname, "../utils", ".env");

const dotenv = require("dotenv")
dotenv.config({path :envFilePaht });

const myDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	//   myDataSource.destroy();
  });

const createUser = async ( nickname, email, hashedPassword, phoneNumber, birthday, profileImage ) => {
	try {
		return await myDataSource.query(
		`INSERT INTO users(
			nickname,
			email,
			password,
			phoneNumber,
			birthday,
			profileImage
		) VALUES (?, ?, ?, ?, ?, ?);
		`,
		[ nickname, email, hashedPassword, phoneNumber, birthday, profileImage ]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

//유저 로그인
const loginUser = async (email, password) =>{
	try{
		return await myDataSource.query(
			`
				select * from users
				where email = ? and password = ?
				
			`,[email, password]
		)
	}catch(err){
		const error = new Error("INVALID_DATA_INPUT");
		error.statusCode = 500;
		throw error;
	}
} 

module.exports = {
  createUser, loginUser
}

