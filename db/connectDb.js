const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DataBase connected!!'))
.catch(err => console.log('Error in DB connection', err))