// service는 비지니스 규칙과 로직을 처리한 후 database에 data를 저장하고 불러오기 위한 Dao에개 데이터를 넘긴다.

//Dao 파일 import
const { SimpleConsoleLogger } = require("typeorm");
const userDao = require("../models/userDao");
const postDao = require("../models/postDao");
const auth = require("../middlewares/auth");
const { selectPost } = require("./postService");
const { json } = require("express");
const { format } = require("morgan");


const signUp = async (nickname, email, password, phoneNumber, birthday, profileImage) => {

    
    //패스워드 길이 제한
    if(password.length <= 10) {
        const err = new Error("패스워드가 10자를 넘지 않습니다.");
        err.statusCode = 409;
        throw err;
    }

    // //이메일 정규식
    // const emailValidation = new RegExp(
    //     '^^[a-zA-Z0-9+-_.]+@{1}[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9-.]+$'
    // );

    // if(!emailValidation.test(email)){
    //     const err = new Error("Email에 .과 @가 포함되지 않았습니다.")
    //     err.statusCode = 409;
    //     throw err;
    // }

    //비밀번호 정규식
    const pwValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );

    if(!pwValidation.test(password)){
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.statusCode = 409;
        throw err;
    }

    //이메일 중복 검사

    //유저 데이터 가져오기
    const duple = await userDao.duplicateCheck();
    // const dbpassword = duple[0].password
    // console.log(dbpassword)
    // // db 패스워드 검증
    // const result = await auth.checkHash(dbpassword, hashedPassword);
    // c

    // //
    const hashedPassword = await auth.makehash(password, 10);
    // // const result = await auth.checkHash(password, hashedPassword);
    // console.log( "비밀번호 검증 결과" + result);
    // console.log(duple[1].password);

     for(let i = 0; i < duple.length; i++){
        if(email === duple[i].email){
            const err = new Error("EMAIL_DUPLICATE");
            console.log(err.message)
            return err.message;
        }
     }

    // hash 된 password 담기
    const createUser = await userDao.createUser(
        nickname, 
        email,
        hashedPassword, //hash된 패스워드 변수 
        phoneNumber,
        birthday,
        profileImage   
    );

     return createUser; 
}

//유저 로그인
const login = async(email, password, nickname, res) => {
    
    try{
    const loginUser = await userDao.loginUser( // email과 passowrd를 DAO로 넘긴다.     
        email,
        password,
        nickname
    );

        const jwtToken = await auth.generateToken(email, nickname);
        const secetKey = process.env.SECRET_KEY;
        const decode = await auth.decode(jwtToken, secetKey);

        console.log("----------------------------------------------");


        const decodeNickname = decode.nickname;
        const decodedEmail = decode.email;


        const dbEmail = loginUser[0].email;
        const dbPassowrd = loginUser[0].password;
        const dbNickname = loginUser[0].nickname;

        // 유저 패스워드 복호화
        const decodePassword = await auth.checkHash(password, dbPassowrd);
 

        if(decode.email === dbEmail && loginUser !== null && decodePassword === true && decodeNickname === dbNickname ){
            console.log("로그인 정보가 일치합니다.");
            // const cookie = auth.setTokenCookie(res, jwtToken);
            return jwtToken;
        }else{
            console.log("로그인 정보가 일치 하지 않습니다.");
            return ""
        }
     }catch(err){
        return "";
     }
}

module.exports = {
    signUp, login
}