import loginRegisterService from '../service/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'api is got successfully'
    })
}

const handleRegister = async (req, res) => {
    try{
        if (!req.body.email|| !req.body.phone || !req.body.password) {
           return res.status(200).json({
            EM: 'Please enter full information',
            EC: 1,
            DT: ''
           })
        }
        let data = await loginRegisterService.RegisterNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
           })

    } catch{
        return res.status(500).json({
           EM: 'Error from sever',
           EC: '-1',
           DT: ''
        })
    } 
}
const handleLogin = async (req, res) => {
    try{
        if (!req.body.valueLogin && !req.body.valuePassword) {
            return res.status(200).json({
                EM: 'Please enter full information',
                EC: '1',
                DT: ''
            })
        }
        let data = await loginRegisterService.CheckLogin(req.body)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
    } catch{
        return res.status(500).json({
                EM: 'Error from server',
                EC: '-1',
                DT: ''
        })    
    }
}

module.exports = {
    testApi, handleRegister, handleLogin
}