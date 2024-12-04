import db from "../models"

const handleGetGroup = async () => {
    try {
        let group = await db.group.findAll({
            order: [['id', 'DESC']]
        })
        if (group) {
            return{
                EM: 'Get data successfully',
                EC: 0,
                DT: group
            }
        } else {
            return{
                EM: 'Data in group table is empty',
                EC: 0,
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

module.exports = {handleGetGroup}
