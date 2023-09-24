const express = require('express')
const cors = require('cors')

const app = express()

const conn = require('./src/db/conn')
// Config JSON response 
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5000' })) // origin = ip da aplicação front

// Public
app.use(express.static('public'))

// Routes
const userRoutes = require('./src/routes/userRoutes')
const petRoutes = require('./src/routes/petRoutes')
app.use('/users', userRoutes)
app.use('/pets', petRoutes)

app.listen(3000, () => console.log('Listen in port 3000'))
