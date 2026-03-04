const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

main().then( () => {
    console.log("connection successful");
}).catch( (err) => {
    console.log(err);
}); 

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded( { extended : true } ) );
app.use(methodOverride("_method"))

//Index Route
app.get("/chats" , async (req , res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index" , { chats });
});

// New Route
app.get("/chats/new" , (req , res) => {
    res.render("new")
});

// Create Route
app.post("/chats" , (req , res) => {
    let {from , to , msg } = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    });
    
    newChat.save().then( () => { 
        console.log("Chat is save");
    }).catch( (err) => {
        console.log(err);
    } );
    res.redirect("/chats");
});

// Edit Route
app.get("/chats/:id/edit" , async (req , res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit" , { chat });
});

// Update route
app.put("/chats/:id" , async (req , res) => {
    let { id } = req.params;
    let { msg : newMsg} = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg : newMsg},
        {runValidators : true , returnDocument: "after"}
    );

    res.redirect("/chats")
});

// Destroy Route
app.delete("/chats/:id" , async (req , res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

});

app.get("/" , (req , res) => {
    res.send("Root is working");
});

app.listen(3000 , () => {
    console.log("Port is listening on port : 3000")
});