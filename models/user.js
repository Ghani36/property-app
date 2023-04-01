const mongoose = require('mongoose')
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 60
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
},
{timestamps: true}
)

userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword;
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = mongoose.model('User', userSchema)