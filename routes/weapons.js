const express = require('express')
const router = express.Router()

let weapons = [
    {
        id: 1,
        title: 'AK-47',
        done: false,
    },
    {
        id: 2,
        title: 'M4A1',
        done: false,
    },
]

router.get('/', (req, res) => {
    res.json(weapons)
})

router.post('/', (req, res) => {
    const { title } = req.body

    const weapon = {
        id: Date.now(),
        title: title.trim(),
        done: false,
    }

    weapons.push(weapon)
    res.status(201).json(weapon)
})

router.get('/:id', (req, res) => {
    const weapon = weapons.find((el) => el.id == req.params.id)
    if (!weapon) {
        return res
            .status(404)
            .json({ message: `Оружие с id: ${req.params.id} не было найдено` })
    }
    res.json(weapon)
})
router.patch('/:id', (req, res) => {
    const index = weapons.findIndex((el) => el.id == req.params.id)
    if (index === -1) {
        return res
            .status(404)
            .json({ message: `Оружие с id: ${req.params.id} не было найдено` })
    }

    const { id, ...updates } = req.body

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json({ message: 'Нет полей для обновления' })
    }

    if (updates.title !== undefined) {
        if (typeof updates.title !== 'string' || !updates.title.trim()) {
            return res
                .status(400)
                .json({ message: 'Поле "title" должно быть непустой строкой' })
        }
        updates.title = updates.title.trim()
    }

    weapons[index] = { ...weapons[index], ...updates }
    res.json(weapons[index])
})

router.delete('/:id', (req, res) => {
    const index = weapons.findIndex((el) => el.id == req.params.id)
    if (index === -1) {
        return res
            .status(404)
            .json({ message: `Оружие с id: ${req.params.id} не было найдено` })
    }

    weapons = weapons.filter((el) => el.id != req.params.id)
    res.status(204).end()
})

module.exports = router