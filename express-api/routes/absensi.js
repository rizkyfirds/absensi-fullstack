const express = require('express')
const router = express.Router()
const AbsensiModel = require('../models/absensi')
const bcrypt = require('bcrypt')


router.get('/', async (req, res) => {
    const absensi = await AbsensiModel.findAll()

    res.status(200).json({
        absensi,
        metadata: "test absensi endpoint"
    })
})

router.post('/checkin', async (req, res) => {
    const {nip} = req.body
    const absensi = await AbsensiModel.create({
        user_nip : nip, status: 'in'
    })

    res.status(200).json({
        absensi,
        metadata: "checkin succes"
    })
})

router.post('/checkout', async (req, res) => {
    const {nip} = req.body
    const absensi = await AbsensiModel.create({
        user_nip : nip, status: 'out'
    })

    res.status(200).json({
        absensi,
        metadata: "check out succes"
    })
})

module.exports = router