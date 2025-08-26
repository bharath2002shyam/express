const mongoose=require('mongoose');



async function getData() {
    mongoose.connect("mongodb://127.0.0.1:27017/books")
    .then(()=>{
        console.log("connected db")
    })
    .catch(()=>{
        console.log("not connected db")
    })
}

module.exports= getData;