const stages = require('express').Router()
const { Stage } = require('../models')
const { Op } = require('sequelize')

stages.get('/', async (req, res) => {
    try {
        const allStages = await Stage.findAll({
            order: [['name', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.send(allStages)
    } catch (e) {
        res.send(e.message)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.json(newStage)
    } catch (e) {
        res.send(e.message)
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const { name, capacity } = req.body
        if (!name && !capacity) {
            throw Error('No fields to update')
        }
        const updatedStage = await Stage.update(req.body, {
            where: { id: req.params.id }
        })
        res.json(updatedStage)
    } catch (e) {
        res.send(e.message)
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deleted = await Stage.destroy({
            where: { id: req.params.id }
        })
        res.send(`Deleted ${deleted} stages.`)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = stages