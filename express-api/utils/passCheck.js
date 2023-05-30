const bcrypt = require('bcrypt')
const UsersModel = require('../models/users')

const passCheck = async (nip,pass)=>{
    const userData = await UsersModel.findOne({ where: { nip: nip } })
    const compare = await bcrypt.compare(pass, userData.pass)
    return {compare, userData}
}

module.exports = passCheck