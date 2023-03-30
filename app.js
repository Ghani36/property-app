const express = require('express')
const cors = require('cors')
require('dotenv').config();
require('./db/connectDB')

const app = express();

const authRoutes = require('./routes/routes')

app.use(express.json())
app.use(cors())

//  MiddleWare
app.use('/api', authRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is runnning on Port ${port}`)
})