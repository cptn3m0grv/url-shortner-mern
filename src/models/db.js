const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mernDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const shortUrlSchema = new mongoose.Schema({
    id:{
        type: String,
    },
    full: {
        type: String,
        required: true,
    },
    short: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('MernDB', shortUrlSchema);