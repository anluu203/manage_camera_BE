import bcrypt from "bcrypt";
import db from "../models/index";

// mã hóa password
const salt = bcrypt.genSaltSync(10);
const hashUserPassWord = (userPassWord) => {
  let hashPassWordCheck = bcrypt.hashSync(userPassWord, salt);
  return hashPassWordCheck;
};
// this func checks if email already exist  
 const checkEmailExist = async (userEmail) =>{
    let user = await db.account.findOne({ 
        where: { 
            email:userEmail 
        } });
    if (user) {
        return true
    }
    return false    
}

 const checkPhoneExist = async (userPhone) =>{
    let user = await db.account.findOne({ 
        where: { 
            phone:userPhone
        } });
    if (user) {
        return true
    }
    return false    
}

const getAllUser = async () =>{
    try {
        let users = await db.account.findAll({
            attributes: ["id", "email", "username", "sex", "phone"],
            include:{model: db.group, attributes:["name","description"]}
        })

        if (users) {
            return{
                EM: 'Get data successfully',
                EC: 0,
                DT: users
            }
        } else {
            return{
                EM: 'User list is empty',
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
const getUserWithPagination = async (page, results) =>{
    try {
        let offset = (page - 1) * results; // offset là vị trí page đang hiển thị DL
        let { count, rows } = await db.account.findAndCountAll({
            offset: offset,
            limit: results,
            attributes: ["id", "email", "username", "phone"],
            include:{model: db.group, attributes:["id","name","description"]},
            order: [['id', 'DESC']]
          });
        
        let totalPages =  Math.ceil(count/results) 
        // hàm làm tròn (VD: Có 31 users, phân thành 
        // 5 users 1 trang, lấy 31 chia 5 = 6.2 (7 trang)


        let data = {
            totalPages: totalPages,
            totalRows:count,
            users: rows
        }
        return{
            EM: 'Get data successfully',
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




const createUser = async (data) => {
    try {
         //check email, phone are existed
         let isExistEmail = await checkEmailExist(data.email)
         if (isExistEmail === true) {
             return {
                 EM:'This email is already exist',
                 EC: 1
             }
         }
     
         let isExistPhone = await checkPhoneExist(data.phone)
         if (isExistPhone === true) {
             return {
                 EM:'This phone number is already exist',
                 EC: 1
             }
         }
         if (data.password < 4) {
             return {
                 EM:'Password must be longer than 3 characters',
                 EC: 1
             }
         }
         //hash password
         let hashPassWord = hashUserPassWord(data.password)
         //create newUser
          await db.account.create({
             email: data.email, 
             password: hashPassWord, 
             username: data.username,
             phone: data.phone,
             groupId: data.groupId
         });
     
         return{
             EM:'User is created successfully',
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



const updateUser = async (data) =>{
    console.log(data)
    try {
        let user = await db.account.findOne({
            where:{id: data.id}
            
        })
        if (!user) {
            console.error('User not found with ID: ', data.id);
            return {
                EM: 'User not found',
                EC: 1,
                DT: null,
            };
        }
    
        // Cập nhật user
        await db.account.update(
            {
                username: data.username,
                groupId: data.groupId,
            },
            { where: { id: data.id } }
        );
    
        return {
            EM: 'User updated successfully',
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
const deleteUser = async (id) =>{
    try {
        let user = await db.account.findOne({
            where:{
              id: id,
            }
           });
        if (user) {
            await user.destroy()
            return{
                EM: 'Delete user successfully',
                EC: 0,
                DT: []
            }
        } else{
            return{
                EM: 'User is not exist',
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

module.exports= {
    createUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserWithPagination
}