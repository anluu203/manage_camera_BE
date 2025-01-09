import db from "../models";

const getCamera = async () =>{
    try {
        let camera = await db.camera.findAll({
            attributes: ["id", "name", "ipAddress","status", "description","roomID"],
            include: {
                model: db.room,
                as: 'room',
                attributes: ["name"],
                required: false // Lấy cả các bản ghi camera không có room
            }
            
        })

        if (camera) {
            return{
                EM: 'Get data successfully',
                EC: 0,
                DT: camera
            }
        } else {
            return{
                EM: 'camera list is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in cameras service',
            EC: 1,
            DT: []
        }
    }
}

// this func checks if  name of camera already exist  
 const checkCameraNameExist = async (cameraName) =>{
    let camera = await db.camera.findOne({ 
        where: { 
            name:cameraName 
        } });
    if (camera) {
        return true
    }
    return false    
}

const createCamera = async (data) => {
    try {
         //check email, phone are existed
         let isExistCameraName = await checkCameraNameExist(data.name)
         if (isExistCameraName === true) {
             return {
                 EM:'This camera name is already exist',
                 EC: 1
             }
         }

         //create new camera
          await db.camera.create({
             name: data.name,
             ipAddress: data.ipAddress, 
             status: data.status,
             description: data.description,
             roomID: data.roomID
         });
     
         return{
             EM:'camera is created successfully',
             EC: 0,
             DT: data
         }        
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}

const updateCamera = async (data) =>{
    console.log(data)
    try {
        let camera = await db.camera.findOne({
            where:{id: data.id}
            
        })
        if (!camera) {
            console.error('camera not found with ID: ', data.id);
            return {
                EM: 'camera not found',
                EC: 1,
                DT: null,
            };
        }
    
        // Cập nhật camera
        await db.camera.update(
            {
                name: data.name,
                ipAddress: data.ipAddress, 
                status: data.status,
                description: data.description,
                roomID: data.roomID
            },
            { where: { id: data.id } }
        );
    
        return {
            EM: 'camera updated successfully',
            EC: 0,
            DT: data,
        };
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}

const deleteCamera = async (id) =>{
    try {
        let camera = await db.camera.findOne({
            where:{
              id: id,
            }
           });
        if (camera) {
            await camera.destroy()
            return{
                EM: 'Delete camera successfully',
                EC: 0,
                DT: []
            }
        } else{
            return{
                EM: 'camera is not exist',
                EC: 1,
                DT: []
            }
        }  
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in service',
            EC: 1,
            DT: []
        }
    }
}
module.exports = {getCamera, createCamera, updateCamera, deleteCamera}