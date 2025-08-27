const mongoose=require('mongoose');



async function getData() {
    mongoose.connect("mongodb+srv://shyambharath50:jRAOVvXoPGbORXRY@bscluster.5xvth.mongodb.net/?retryWrites=true&w=majority&appName=BsCluster")
    .then(()=>{
        console.log("connected db")
    })
    .catch(()=>{
        console.log("not connected db")
    })
}

module.exports= getData;