import apiCrud_Room_Service from "../service/apiCrud_Room_Service"

const handleGetRooms = async (req, res) =>{
    try {
         let data = await apiCrud_Room_Service.getRooms(req)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
        })  
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                EM: 'Error from room controller',
                EC: '-1',
                DT: ''
        }) 
        }
}

const handleCreateRoom = async (req, res) =>{
    try {
        if (!req.body.name|| !req.body.description || !req.body.address) {
            console.log('req.body room', req.body)
            return res.status(200).json({
             EM: 'Please enter full required data',
             EC: '1',
             DT: ''
            })
         }
         let data = await apiCrud_Room_Service.createRoom(req.body)
         console.log('req.body room', req.body)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
        })  
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                EM: 'Error from room controller',
                EC: '-1',
                DT: ''
        }) 
        }
}

const handleUpdateRoom = async (req, res) =>{
    try{
        let data = await apiCrud_Room_Service.updateRoom(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
           })

    } catch{
        return res.status(500).json({
           EM: 'Error from sever',
           EC: '-1',
           DT: ''
        })
    } 
}

const handleDeleteRoom = async (req, res) =>{
    try {
        let data = await apiCrud_Room_Service.deleteRoom(req.body.id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
    })
    }
}
module.exports = { handleGetRooms, handleCreateRoom, handleUpdateRoom, handleDeleteRoom}