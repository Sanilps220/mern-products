const mongoose = require('mongoose')

const produtSchema = new mongoose.Schema({
    name:{required:true,type:String},
    price:{required:true,type:Number},
    categories:{type:String,required:true},
    subcategories:{type:String,required:true},

    MC:[{type:String}],    
    TV:[{type:String}],
    MEN:[{type:String}], 

    //allphone:[{type:String}],
    // basicphone:[{type:String}],
    // android:[{type:String}],
})  
mongoose.model("Products",produtSchema)