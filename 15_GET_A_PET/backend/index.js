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
const UserRoutes = require('./src/routes/UserRoutes')
app.use('/users', UserRoutes)


app.listen(3000, () => console.log('Listen in port 3000'))
