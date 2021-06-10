const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect(process.env.DB_URL_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const shortUrlSchema = new mongoose.Schema({
    genId:{
        type: Number,
        require: true
    },
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    timeStamp: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('MernDB', shortUrlSchema);