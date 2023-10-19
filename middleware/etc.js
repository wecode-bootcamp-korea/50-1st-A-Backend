const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;

//token 만들기
const generateToken = (email, userId) => {
  console.log("gene :", userId);
  return jwt.sign({ email ,userId }, secretKey);
};

//디코딩 token
const decoded = (token, secretKey) => {
  const result = jwt.verify(token, secretKey);
  console.log("decoded : ", result);
  return result;
};

//hash 만들기
const makeHash = async (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

//hash 검증
const checkHash = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  makeHash,
  checkHash,
  decoded,
};
