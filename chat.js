const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({  //Define Schema
    from: {
        type: String,
        require: true,
    },
    to:{
        type: String,
        require: true,
    },
    msg:{
        type: String,
        maxLength: 50,
    },
    created_at:{
        type: Date,
        require: true,
    }

});

const Chat = mongoose.model("Chat", chatSchema); //Define Model
module.exports = Chat;  //Export Model