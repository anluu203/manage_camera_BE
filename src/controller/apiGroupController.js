import apiGroupService from '../service/apiGroupService'


const getGroup = async (req, res) =>{
    try {
        let data = await apiGroupService.handleGetGroup(req)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
           })
    } catch (error) {
        console.log('err in group controller :', error)
        return res.status(500).json({
            EM: 'Error from sever',
            EC: '-1',
            DT: ''
         })
    }
}

module.exports = {getGroup}