const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secetKey = process.env.SECRET_KEY;

// 토큰 생성
const generateToken = (email) => {
    return jwt.sign(email, secetKey)
    
}

// 토큰 검증
const decode = async (jwtToken, secetKey) => {
    console.log(jwtToken, secetKey);
    return jwt.verify(jwtToken, secetKey);
}

// 패스워드 암호화
const makehash = async (password, saltRound) => {
    console.log(password, saltRound);
    return bcrypt.hash(password, saltRound);
}

//패스워드 검증
const checkHash = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}




module.exports = {
    generateToken, makehash, checkHash, decode
}


