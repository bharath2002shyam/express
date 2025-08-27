const express = require("express");
const app = express();
const path=require("path");
const exhb=require("express-handlebars");
const bodyparcer=require("body-parser")
const dataBase=require("./db");
const bookmodel=require('./models/bookmodel');
const evnimt=require("dotenv")
evnimt.config({path:path.join(__dirname,"views","config.env")})
const PORT = process.env.PORT;


dataBase();

// app.use(db)
app.use(bodyparcer.urlencoded({extended:true}))
app.engine("hbs",exhb.engine({
  layoutsDir:"views/",
  defaultLayout:"main",
  extname:"hbs",
 runtimeOptions:{
  allowProtoPropertiesByDefault:true,
  allowProtoMethodsByDefault:true
 }
}));
app.set("view engine","hbs");
app.set("views","views")


// app.get("/", (req, res) => {
//   res.send("Hello, Express is running!");
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// app.get("/",(req,res)=>{
//   console.log("hello")
//   res.sendFile(path.join(__dirname,"index.html"))
// })
// app.get("/admin",(req,res)=>{
//   console.log("hello")
//   res.sendFile(path.join(__dirname,"adim.html"))
// })





app.post("/storebook",(req,res)=>{
  let book={ bookname:req.body.bookname, author:req.body.author}
  const data=  new bookmodel(book)
  data.save();
  console.log("form submitted")
  return res.redirect("/?status=1")
  // res.send(`<h1>form submitted<h1/><a href="/">go back<a/>`)
  // // res.render("submit")
  
})

app.post("/edit_book/:id",async(req,res)=>{
  let book={ bookname:req.body.bookname, author:req.body.author}
  const data=await bookmodel.findOneAndUpdate({_id:req.params.id},{$set:book})
  .then((dat)=>{
      console.log("updated sucessfully",dat)
  })
  .catch((err)=>{
    console.log(err)
  })
  
  return res.redirect("/?status=2")
})





app.get("/",async(req,res)=>{
    let book=await bookmodel.find({})

  let message= ""
  let edit_id,edit_book
  let del_id=req.params.del_id

  if (req.query.edit_id) {
    edit_id=req.query.edit_id;
    edit_book=await bookmodel.findByIdAndUpdate(edit_id)
  }



if(req.query.del_id){
   await bookmodel.findOneAndDelete({_id:req.query.del_id})
   return  res.redirect("/?status=3")
}



  switch (req.query.status) {
    case "1":
      message="form submitted"
      break;

      case "2":
      message="edited sucessfully"
      break;

      case "3":
      message="deleted sucessfully"
      break;
  
    default:
      break;
  }

  return res.render("main",{message,book,edit_id,edit_book,del_id})
})


app.listen(PORT,(req,res)=>{
  console.log(`hello listing to ${PORT} port`)
})