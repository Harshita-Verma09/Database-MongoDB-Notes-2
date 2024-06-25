const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");  //Require Chat.js
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => { console.log(err) });
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsappl'); //Database name..
}

//Index Route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();  //for Fetching the data from Init.js file.
    // console.log(chats);
    res.render("index.ejs", {chats});
});


//New Route
app.get("/chats/new", (req,res)=>{
   res.render("new.ejs");
});


//create Route
//__________After fill the form.  
app.post("/chats", (req, res)=>{
    let {from, to, msg}= req.body; //Find out fruitful data from form to store our DB.
    let newChat = new Chat({     //Store in Array
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat 
    .save()  //Store in DB.
    .then(res =>{console.log("Chat was Saved")}) .catch(err =>{console.log(err)}) 
    res.redirect("/chats");

});



//Edit route
app.get("/chats/:id/edit", async(req,res)=>{
    let {id} =req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});


//Update Route
app.put("/chats/:id", async (req ,res)=>{
    let {id} =req.params;
    let {msg: newMsg} = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {msg: newMsg},
        {runValidators : true, new: true}
    ); 
    console.log(updatedChat);
    res.redirect("/chats");
});


//Destroy Route
app.delete("/chats/:id", async(req, res)=>{
    let {id} =req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log("deletedChat");
    res.redirect("/chats");

});

app.get("/", (req, res) => {
    res.send("Root Route");
});

app.listen(8080, () => {
    console.log("Server is Listening on port of 8080");
});