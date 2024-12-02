import  express  from "express";
import apiController from '../../controller/apiController'
import apiCrud_User_Controll from '../../controller/apiCrud_User_Controll'
import apiGroupController from '../../controller/apiGroupController'
const router = express.Router();

/**
 *  express app
 */



 const initApiRouters = (app) => {
   
    //rest api
    // get -R, post -C, put -U, delete -D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    
    //api thêm sửa xóa người dùng
    router.get("/user/getAllUser", apiCrud_User_Controll.handleGetUser)
    router.delete("/user/delete",apiCrud_User_Controll.handleDeleteUser)

    
    //api lấy dữ liệu của position table
    router.get("/position/read", apiGroupController.readPosition)

    return app.use("/api/v1/", router);

}

export default initApiRouters;

