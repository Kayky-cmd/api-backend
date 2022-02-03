const mongoose = require('mongoose');

const Celo = mongoose.model('Celo', {

    name: {
        type: String,
        require: false,
    },

    password: {
        type: String,
        required: false,
        
    },

    createAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = Celo;
