import db from "../models"

const getGroupWithRole = async (user) =>{
    let roles = await db.group.findOne({
    where: {id: user.groupId},
    attributes: ["id", "name", "description"],
    include: {
        model: db.roles, 
        attributes: ["id", "url"],
        through: { attributes: []}
        },
    })
    return roles ? roles : {}

}

module.exports ={getGroupWithRole}