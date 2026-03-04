const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then( () => {
    console.log("connection successful");
}).catch( (err) => {
    console.log(err);
}); 

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from : "Adam",
        to : "Bob",
        msg : "Hello Bob! How are You",
        created_at : new Date()
    },
    {
        from : "Charles",
        to : "David",
        msg : "Hello! How are You",
        created_at : new Date()
    },
    {
        from : "Edwin",
        to : "Falukner",
        msg : "I want something new dish",
        created_at : new Date()
    },
    {
        from : "George",
        to : "Harry",
        msg : "There was a cold day",
        created_at : new Date()
    },
    {
        from : "Isaac",
        to : "James",
        msg : "Great!",
        created_at : new Date()
    },
    {
        from : "Kenelm",
        to : "Lewis",
        msg : "Thinking at night when everyone else is sleeping.",
        created_at : new Date()
    },
    {
        from : "Matthew",
        to : "Newton",
        msg : "How is your health , now?",
        created_at : new Date()
    },
    {
        from : "Owen",
        to : "Phillip",
        msg : "Nice to see you",
        created_at : new Date()
    },
    {
        from : "Richard",
        to : "Steve",
        msg : "My friend is Richard.",
        created_at : new Date()
    }
];

Chat.insertMany(allChats);