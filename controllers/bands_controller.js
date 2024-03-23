const bands = require('express').Router()
const { Band } = require('../models')

bands.get('/', async(req, res) => {
    try{
        const allBands = await Band.findAll()
        res.send(allBands)
    } catch (e) {
        res.send(e.message)
    }
    
})

module.exports = bands