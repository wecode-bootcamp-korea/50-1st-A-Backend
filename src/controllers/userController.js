// Controller 파일은 http 요청들을 읽어들여 비지니스 로직으로 흘러 가야되는 데이터를 검증한다.

// 비지니스 로직을 처리하는 userService 파일을 import 
const { token } = require("morgan");
const userService  = require("../services/userService");
    

//회원 가입 정보에 대한 데이터를 받아오는 함수
const signUp = async (req, res) => {

    //받아오는 데이터에 대한 예외처리
    try{
        const {nickname, email, password, phoneNumber, birthday, profileImage} = req.body;   // post로 보내진 데이터에 대한 변수 선언

        console.log(nickname, email, password, phoneNumber, birthday, profileImage);

        if(!nickname || !email || !password || !phoneNumber || !birthday || !profileImage) {  // 받아온 데이터 검증
            return res.status(400).json({message : "KEY_ERROR"});
        }

        await userService.signUp(nickname, email, password, phoneNumber, birthday, profileImage); // 검증이 완료되면 받아온 데이터를 service로 넘긴다.
        return res.status(201).json({message : "SIGNUP_SUCCESS"});

    }catch(err){   // 데이터 검증 실패
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

//유저 로그인
const login = async (req, res) => {
    try{
        const email = req.body.email;
        const password= req.body.password;

        if(!email || !password){
            return res.status(400).json({message : "이메일 주소와 패스워드를 확인해 주세요."});
        }
        // 발급 받은 토큰을 받아 응답
        const token = await userService.login(email, password);
        res.co
        return res.status(200).json({accessToken : token});

    }catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}


module.exports = {
	signUp, login
}