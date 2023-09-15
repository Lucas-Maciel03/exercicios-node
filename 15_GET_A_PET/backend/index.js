const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response 
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5000' })) // origin = ip da aplicação front

// Public
app.use(express.static('public'))

// Routes

app.listen(3000)