const express = require('express')
const projectsRoutes = require('./routes/projects')
const tasksRoutes = require('./routes/tasks')

const weaponRoutes = require('./routes/weapons')

 

const app = express()

app.use(express.json())

app.use((req,res,next) => {
    const startedAt = new Date()

    res.on('finish', () => {
        console.log(`${startedAt.toISOString()} - ${req.method} ${req.originalUrl}`);
    } )

    next()
})

app.get('/api',(req,res) => {
    res.json({ message: "Service is healty"})
})

app.use('/api/projects', projectsRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/weapons', weaponRoutes);

app.use ((req,res) => {
    res.status(404).json({ error: `Маршрут ${req.originalUrl} не найден`})
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: "Внутренняя ошибка сервера"}
    )
})

module.exports = app