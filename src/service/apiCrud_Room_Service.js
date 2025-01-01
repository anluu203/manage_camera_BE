import db from "../models";

const getRooms = async () =>{
    try {
        let room = await db.room.findAll({
            attributes: ["id", "name", "address", "description"],
        })

        if (room) {
            return{
                EM: 'Get data successfully',
                EC: 0,
                DT: room
            }
        } else {
            return{
                EM: 'Room list is empty',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log('Error: ',error)
        return{
            EM: 'Something wrongs in rooms service',
            EC: 1,
            DT: []
        }
    }
}

// this func checks if  name of room already exist  
 const checkRoomNameExist = async (roomName) =>{
    let room = await db.room.findOne({ 
        where: { 
            name:roomName 
        } });
    if (room) {
        return true
    }
    return false    
}

 const checkAddressExist = async (existAddress) =>{
    let address = await db.room.findOne({ 
        where: { 
            address:existAddress
        } });
    if (address) {
        return true
    }
    return false    
}
const createRoom = async (data) => {
    try {
         //check email, phone are existed
         let isExistRoomName = await checkRoomNameExist(data.name)
         if (isExistRoomName === true) {
             return {
                 EM:'This room name is already exist',
                 EC: 1
             }
         }
     
         let isExistAddress = await checkAddressExist(data.address)
         if (isExistAddress === true) {
             return {
                 EM:'This address is already exist',
                 EC: 1
             }
         }

         //create new room
          await db.room.create({
             name: data.name, 
             address: data.address,
             description: data.description,
         });
     
         return{
             EM:'Room is created successfully',
             EC: 0
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

const updateRoom = async (data) =>{
    console.log(data)
    try {
        let room = await db.room.findOne({
            where:{id: data.id}
            
        })
        if (!room) {
            console.error('Room not found with ID: ', data.id);
            return {
                EM: 'Room not found',
                EC: 1,
                DT: null,
            };
        }
    
        // Cập nhật room
        await db.room.update(
            {
                name: data.name,
                address: data.address,
                description: data.description,
            },
            { where: { id: data.id } }
        );
    
        return {
            EM: 'Room updated successfully',
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

const deleteRoom = async (id) =>{
    try {
        let room = await db.room.findOne({
            where:{
              id: id,
            }
           });
        if (room) {
            await room.destroy()
            return{
                EM: 'Delete room successfully',
                EC: 0,
                DT: []
            }
        } else{
            return{
                EM: 'Room is not exist',
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
module.exports = {getRooms, createRoom, updateRoom, deleteRoom}