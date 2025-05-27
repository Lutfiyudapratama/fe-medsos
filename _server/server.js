const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const studentRoutes = require('./routes/studentRoutes')
const majorRoutes = require('./routes/majorRoutes')
const commentRoutes = require('./routes/commentRoutes')
const cors = require('cors')
const postingRoutes = require('./routes/postingRoutes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const port = 3001
const hostName = "127.0.0.1"

const corsOption = {
    origin: [`http://${hostName}:5173`, `http://localhost:5173`]
}

app.use('/v1/auth', cors(corsOption), authRoutes(express))
app.use('/v1/post', cors(corsOption), postingRoutes(express))
app.use('/v1/comment', cors(corsOption), commentRoutes(express))
app.use('/v1/student', studentRoutes(express))
app.use('/v1', cors(corsOption), majorRoutes(express))
app.get('/', (req, res) => {
    res.send({
        message: 'Home Page'
    })
})

app.listen(port, () => console.log(`Server running at http://${hostName}:${port}`))



// const { createServer } = require('http')

// const hostName = '127.0.0.1'
// const port = 3000

// const server = createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plan')
//     res.end("Hello Dunia!!")
// })

// server.listen(port, hostName, () => {
//     console.log(`Server running at http://${hostName}:${port}`)
// })