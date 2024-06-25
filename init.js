const mongoose = require('mongoose');
const Chat = require("./models/chat.js");  //Require Chat.js

main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => { console.log(err) });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsappl'); //Database name..
}



//Insert Data in Chat Schema..
let allChats = [
    {
        from: "Amit",
        to: "Rohit",
        msg: "How are you doing?",
        created_at: new Date(),
    },
    {
        from: "Rohit",
        to: "Amit",
        msg: "I am doing well, Amit. How about you?",
        created_at: new Date(),
    },
    {
        from: "Sneha",
        to: "Priya",
        msg: "Are you coming to the meeting today?",
        created_at: new Date(),
    },
    {
        from: "Priya",
        to: "Sneha",
        msg: "Yes, I will be there.",
        created_at: new Date(),
    },
    {
        from: "Ankit",
        to: "Neha",
        msg: "Can you help me with this code?",
        created_at: new Date(),
    },
    {
        from: "Neha",
        to: "Ankit",
        msg: "Sure, I can help you.",
        created_at: new Date(),
    }
];

Chat.insertMany(allChats);  //Insert Multiple data into Database..


