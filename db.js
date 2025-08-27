const mongoose=require('mongoose');
const ev=require("dotenv")
const path=require("path")
ev.config({path:path.join(__dirname,"views","config.env")})

async function getData() {
    mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("connected db")
    })
    .catch(()=>{
        console.log("not connected db")
    })
}

module.exports= getData;