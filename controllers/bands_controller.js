const bands = require('express').Router()
const { Band } = require('../models')
const { Op } = require('sequelize')

bands.get('/', async(req, res) => {
    try{
        const allBands = await Band.findAll({
            order: [[ 'available_start_time','ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name: ''}%`}
            }
        })
        res.send(allBands)
    } catch (e) {
        res.send(e.message)
    }
    
})

bands.post('/', async (req, res) =>{
    try{
        const newBand = await Band.create(req.body)
        res.json(newBand)
    } catch (e) {
        res.send(e.message)
    }
})


bands.put('/:id', async (req, res) => {
    try {
        const { name, genre } = req.body
        if (!name && !genre) {
            throw Error('No fields to update')
        }
        const updatedBand = await Band.update(req.body, {
            where: { id: req.params.id }
        })
        res.json(updatedBand)
    } catch (e) {
        res.send(e.message)
    }
})

bands.delete('/:id', async (req, res) =>{
    try {
        const deleted = await Band.destroy({
            where: { id: req.params.id }
        })
        res.send(`Deleted ${deleted} bands.`)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = bands