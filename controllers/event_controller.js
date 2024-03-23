const events = require('express').Router()
const { Event } = require('../models')
const { Op } = require('sequelize')

events.get('/', async (req, res) => {
    try {
        const allEvents = await Event.findAll({
            order: [['start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.send(allEvents)
    } catch (e) {
        res.send(e.message)
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.json(newEvent)
    } catch (e) {
        res.send(e.message)
    }
})

events.put('/:id', async (req, res) => {
    try {
        const { name, location } = req.body
        if (!name && !location) {
            throw Error('No fields to update')
        }
        const updatedEvent = await Event.update(req.body, {
            where: { id: req.params.id }
        })
        res.json(updatedEvent)
    } catch (e) {
        res.send(e.message)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deleted = await Event.destroy({
            where: { id: req.params.id }
        })
        res.send(`Deleted ${deleted} events.`)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = events