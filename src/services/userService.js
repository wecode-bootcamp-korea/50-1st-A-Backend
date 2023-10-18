// service는 비지니스 규칙과 로직을 처리한 후 database에 data를 저장하고 불러오기 위한 Dao에개 데이터를 넘긴다.

//Dao 파일 import
const { SimpleConsoleLogger } = require("typeorm");
const userDao = require("../models/userDao");
const auth = require("../middlewares/auth");


const signUp = async (nickname, email, password, phoneNumber, birthday, profileImage) => {
    
    //패스워드 길이 제한
    if(password.length < 10) {
        const err = new Error("패스워드가 10자를 넘지 않습니다.");
        err.statusCode = 409;
        throw err;
    }

    //이메일 정규식
    const emailValidation = new RegExp(
        "^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    );

    if(!emailValidation.test(email)){
        const err = new Error("Email에 .과 @가 포함되지 않았습니다.")
        err.statusCode = 409;
        throw err;
    }

    //비밀번호 정규식
    const pwValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );

    if(!pwValidation.test(password)){
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.statusCode = 409;
        throw err;
    }

    const hashedPassword = await auth.makehash(password, 10);

    // hash 된 password 담기
    const createUser = await userDao.createUser(
        nickname, 
        email,
        hashedPassword, //hash된 패스워드 변수 
        phoneNumber,
        birthday,
        profileImage   
    );

     const result = await auth.checkHash(password, hashedPassword);
     console.log( "비밀번호 검증 결과" + result);
     
     return createUser; 
    
}

//유저 로그인
const login = async(email, password) => {
    const login = await userDao.loginUser( // email과 passowrd를 DAO로 넘긴다.
        email, 
        password
    );
    try{
        const jwtToken = auth.generateToken(email);
        const secetKey = process.env.SECRET_KEY;
        const decode = await auth.decode(jwtToken, secetKey);

        try{
            const dbEmail = login[0].email
            if(decode === dbEmail){
                console.log("email 정보가 일치합니다.");
                return jwtToken;
            }
        }catch(err){
            console.log("email 정보가 일치하지 않습니다.", err);
            return {message : "Create Token Fail"}
        }
    }catch(err){
        console.log("email 검증에 실패 하였습니다.", err);
        return {message : "Create Token Fail"}
    }
}

module.exports = {
    signUp, login
}