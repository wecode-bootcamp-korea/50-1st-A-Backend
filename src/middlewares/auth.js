const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secetKey = process.env.SECRET_KEY;


const verfityToken = async (req, res, next) => {
    
    const jwtToken = req.headers.token

    if(!jwtToken){
        res.status(403).json({message : "권한이 없습니다"});
    }else{
        try{
            const decoded = await decode(jwtToken, secetKey);
            req.user = decoded;
            next();
        }catch(err){
            return res.status(403).json({message : "권한이 없습니다."});
        }   
    }
}

    // jwt.verify(token, secetKey, (err, decoded) => {
    //     if(err){
    //         
    //     }

    //     req.user = decoded;
    //     next();
    // });


// 패스워드 암호화
const makehash = async (password, saltRound) => {
    return bcrypt.hash(password, saltRound);
}

//패스워드 검증
const checkHash = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// 토큰 생성
const generateToken = async (email, nickname) => {
    const payload = {email, nickname};
    return jwt.sign(payload, secetKey);
}

// 토큰 검증
const decode = async(jwtToken, secetKey) => {
    return jwt.verify(jwtToken, secetKey);
}

    // jwt.verify(token, secetKey, (err, decoded) => {
    //     if(err){
    //         return res.status(403).json({message : "권한이 없습니다."});
    //     }

    //     req.user = decoded;
    //     next();
    // });
// }


//토큰 쿠키설정
// const setTokenCookie = (res, token) => {
//   res.cookie("token", token,{httpOnly : true, 
//                 maxAge:600 * 600 * 1000})
//     return token;
   
// };



module.exports = {
    generateToken, makehash, checkHash, decode, verfityToken
}


