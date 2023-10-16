// Controller 파일은 http 요청들을 읽어들여 비지니스 로직으로 흘러 가야되는 데이터를 검증한다.

// 비지니스 로직을 처리하는 userService 파일을 import 
const userService  = require("../services/userService");


//화원 가입 정보에 대한 데이터를 받아오는 함수
const signUp = async (req, res) => {

    //받아오는 데이터에 대한 예외처리
    try{
        const {id, name, email, password} = req.body;   // post로 보내진 데이터에 대한 변수 선언

        console.log(id, name, email, password);

        if(!id || !name || !email || !password ) {  // 받아온 데이터 검증
            return res.status(400).json({message : "KEY_ERROR"});
        }

        await userService.signUp(id, name, email, password); // 검증이 완료되면 받아온 데이터를 service로 넘긴다.
        return res.status(201).json({message : "SIGNUP_SUCCESS"});

    }catch(err){   // 데이터 검증 실패
        console.error(err);
        return res.status(err.statusCode || 500).json({message : err.message});
    }
}

const selectUser = async (req, res) => {

    try{
        const id = req.query.id
        if(!id){
            return res.status(400).json({ message: "ID parameter is required" });
        }
        await userService.selectUser(id);
        return res.status(200).json({ message: "select success" });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
	signUp, selectUser
}