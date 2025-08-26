const mongoose=require('mongoose')
const bookSchema= new mongoose.Schema({
    bookname:{
        type:String
    },
    author: {
        type:String
    }
})
const bookmodel= mongoose.model('books',bookSchema);
module.exports=bookmodel