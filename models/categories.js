const mongoose = require('mongoose')

const addCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 60
    },
    image: {
        type: String
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Category', addCategorySchema)