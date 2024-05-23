
const mongoose = require('mongoose');

const unishop = new mongoose.Schema({
    Name:{
        type: String,
        required:true
    },
    Discribtion:{
        type: String,
        required:true
    },

    Location:{
        type: String,
        required:true
    },

    Image:{
        type: String,
        required:true
    },

    University:{
        type: String,
        required:true
    },

    Created:{
        type:Date,
        required:true,
        default:Date.now,
    }




})


module.exports = mongoose.model('Unishop',unishop)