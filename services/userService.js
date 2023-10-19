const userDao = require("../models/userDao");
const etc = require("../middleware/etc");

const signUp = async (nickname, email, password) => {
  //패스워드 길이 예외
  if (password.length < 10) {
    const err = new Error("패스워드는 10자리 이상이어야 합니다.");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await etc.makeHash(password, 10);

  const insertHash = await userDao.signUp(nickname, email, hashedPassword);

  const result = await etc.checkHash(password, hashedPassword);

  console.log(result);

  return insertHash;
};

const login = async (email) => {
  const users = await userDao.login(email);
  console.log(users);

  return users;
};
module.exports = {
  signUp,
  login,
};
