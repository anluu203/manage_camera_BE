import  express  from "express";
import apiController from '../../controller/apiController'
import apiCrud_User_Controll from '../../controller/apiCrud_User_Controll'
import apiGroupController from '../../controller/apiGroupController'
import {checkUserJWT, checkUserPermission} from "../../middleware/jwtAction"
import apiRoomController from "../../controller/apiRoomController"
const router = express.Router();

/**
 *  express app
 */



 const initApiRouters = (app) => {
    router.all("*", checkUserJWT, checkUserPermission) 
    //rest api
    // get -R, post -C, put -U, delete -D
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout )
    router.get("/account", apiController.getUserAccount)
    
    //api thêm sửa xóa người dùng
    router.get("/user/getAllUser", apiCrud_User_Controll.handleGetUser)
    router.delete("/user/delete",apiCrud_User_Controll.handleDeleteUser)
    router.post("/user/create", apiCrud_User_Controll.handleCreateUser)
    router.put("/user/update", apiCrud_User_Controll.handleUpdateUser)
    
    //api lấy dữ liệu của position table
    router.get("/group/read", apiGroupController.getGroup)

    //api for list room
    router.get("/room/read", apiRoomController.handleGetRooms)
    router.post("/room/create", apiRoomController.handleCreateRoom )
    router.put("/room/update", apiRoomController.handleUpdateRoom)
    router.delete("/room/delete",apiRoomController.handleDeleteRoom)

    
    return app.use("/api/v1/", router);

}

export default initApiRouters;

