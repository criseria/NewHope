const boardModel = require('../models/boardModel');
const userModel = require('../models/userModel');
// const commentModel = require('../models/commentModel');
const axios = require('axios');
const { login } = require('./auth.controller');

// const loginSubmit = async (userId, userPassword) => {
//     var response = await userModel(userId, userPassword);

//     if (typeof response.data.code != "undefined"){
//         loginFail(response.data.message);
//     }
//     else{
//         loginSuccess(id);
//         alert("로그인에 성공하셨습니다. 글 작성 가능합니다.")

//         location.href = "/board/boardcreate";
//     }
// }


const create = async(req, res) => {
    const boardModel = req.axios.boardModel;
    const {categoryId, title, content, userName} = req.body;
    
    console.log(boardModel);

    try {

        // res.status(200).json({
        //         userName : userInfo.userName
        // });

        // if (userInfo){
        //     const boarddata = await boardModel.create({
        //         categoryId,
        //         title, 
        //         userName,
        //         content,
        //         boardDate
        //     });    
            
        }
    //     res.redirect("/board");
    // console.log(boarddata);
    // }
    catch(error){
    //         res.status(500).json({ error: "서버 오류", message: error.message });
}   
};

module.exports = { create };