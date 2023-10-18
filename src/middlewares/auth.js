const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secetKey = process.env.SECRET_KEY;


// 패스워드 암호화
const makehash = async (password, saltRound) => {
    console.log(password, saltRound);
    return bcrypt.hash(password, saltRound);
}

//패스워드 검증
const checkHash = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}


// 토큰 생성
const generateToken = (email) => {
    return jwt.sign(email, secetKey)
    
}

// 토큰 검증
const decode = async (jwtToken, secetKey) => {
    return jwt.verify(jwtToken, secetKey);
}


// 토큰 쿠키설정
const setTokenCookie = (res, token) => {
  res.cookie("token", token,{httpOnly : true, 
                maxAge:60 * 60 * 1000})
    return token;
   
};





module.exports = {
    generateToken, makehash, checkHash, decode, setTokenCookie
}


