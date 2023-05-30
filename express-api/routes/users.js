const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
const passCheck = require('../utils/passCheck')

router.get('/', async (req, res) => {
    const users = await UsersModel.findAll()

    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})

router.post('/', async (req, res) => {
    const { nip, nama, pass } = req.body

    const encrytedPassword = await bcrypt.hash(pass, 10) //di encrypt. 10 umunya seperti itu di dokumen

    const users = await UsersModel.create({
        nip, nama, pass: encrytedPassword
    })

    res.status(200).json({
        registered: users,
        metadata: "test post user endpoint"
    })
})

router.put('/', async (req, res) => {
    const { nip, nama, pass, newpass } = req.body //ngambil data dari fe
    //diganti dengan func passCheck()
    // const userData = await UsersModel.findOne({ where: { nip: nip } }) //ntuk ngecek nip yg di fe sama dengan yg ada dengan db
    // const compare = await bcrypt.compare(pass, userData.pass) //dibycrypt agar sama
    const check = await passCheck(nip,pass)
    const encrytedPassword = await bcrypt.hash(newpass, 10)
    // res.json({compare}) untuk ngecek sama ga nya

    if (check.compare === true) {
        const users = await UsersModel.update({
            nama, pass: encrytedPassword
        }, { where: { nip:nip } })
        res.status(200).json({
            data: users,
            metadata: "updated sucses"
        })
    }else{
        res.status(400).json({
            error: "data invalid"
        })
    }

})

router.post('/login', async (req,res) =>{
    const {nip, pass} = req.body
    try{
        const check = await passCheck(nip,pass)
        if (check.compare === true){
            res.status(200).json({
                users: check.userData,
                metadata: "login succes"
            })
        }
    }catch(e){
        res.status(400).json({
            error: "data invalid"
        })
    }
})



module.exports = router