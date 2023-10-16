// service는 비지니스 규칙과 로직을 처리한 후 database에 data를 저장하고 불러오기 위한 Dao에개 데이터를 넘긴다.

//Dao 파일 import
const userDao = require("../models/userDao")

const signUp = async (id, name, email, password) => {
    
    const pwValidation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
    );

    if(!pwValidation.test(password)){
        const err = new Error("PASSWORD_IS_NOT_VALID");
        err.statusCode = 409;
        throw err;
    }

    const createUser = await userDao.createUser(
        id,
        name,
        email,
        password
    );

    return createUser;

}

const selectUser = async (id) => {
    const selectUser = await userDao.selectUser(
        id
    );

    return selectUser;

    
}

module.exports = {
    signUp, selectUser
}