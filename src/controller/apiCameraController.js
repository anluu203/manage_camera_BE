import apiCrud_camera_Service from "../service/apiCrud_Camera_Service"

const handleGetCamera = async (req, res) =>{
    try {
        // Tạo URL công khai cho file
       // const fileUrl = `${res.protocol}://${res.get('host')}/uploads/${res.file.filename}`;
        
        // Cập nhật req.body với URL
       // res.body.ipAddress = fileUrl;
         let data = await apiCrud_camera_Service.getCamera(req)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
        })  
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                EM: 'Error from camera controller',
                EC: '-1',
                DT: ''
        }) 
        }
}

const handleCreateCamera = async (req, res) => {
    try {
        // Tạo URL công khai cho file
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
        // Cập nhật req.body với URL
        req.body.ipAddress = fileUrl;

        // Lưu thông tin camera vào database
        let data = await apiCrud_camera_Service.createCamera(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            EM: 'Error from camera controller',
            EC: '-1',
            DT: ''
        });
    }
};



const handleUpdateCamera = async (req, res) =>{
    try{
        let data = await apiCrud_camera_Service.updatecamera(req.body)
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

const handleDeleteCamera = async (req, res) =>{
    try {
        let data = await apiCrud_camera_Service.deletecamera(req.body.id)
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
module.exports = { handleGetCamera, handleCreateCamera, handleUpdateCamera, handleDeleteCamera}