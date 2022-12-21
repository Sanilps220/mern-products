const express = require('express');
const mongoose = require('mongoose');
const app = express()
require('dotenv').config()
//app.use(require('cors'))
const {MONGO_URL} = require("./config/keys")

connect = async () => {
    await mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
}
// mongoose.connection.on("connected",()=>{
//    console.log("db connceted");
  
// })
// mongoose.connection.on("err",(err)=>{
//    console.log(err);
// })

require('./models/product');

app.use(express.json())


app.use(require('./routes/screen'));

const PORT = process.env.PORT || 5000

const path = require('path')

//app.use(express.static(path.join(__dirname+'./client/build')));
app.use(express.static(path.join(__dirname+'/public')))

app.get("*",(_,res)=>{
        //res.sendFile(path.join(__dirname+'/client/build/index.html'),
        res.sendFile(path.join(__dirname+'/build/index.html'),
        function(err){           
            res.status(500).send(err);
        })
    })
// app.get("*",(_,res)=>{
//         res.sendFile(path.join(__dirname+'./client/build/index.html'),
//         //res.sendFile(path.join(__dirname+'./build/index.html'),
//         function(err){           
//             res.status(500).send(err);
//         })
//     })

    
app.listen(PORT,async()=>{   
    try {
        await connect();
        console.log(`Listening at ${PORT}`);
      } catch (e) {
        console.log(e.message);
      }
})