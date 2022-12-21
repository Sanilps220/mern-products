const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
//const products =  require('../models/product')
const Products = mongoose.model("Products")

// router.get('',(req,res)=>{
//    // Products.find({smartphone:true})
// //    const mobil = await Products.find({categories: "mobile"})
// //    const mobilsCom  =await Products.find({$or:[{categories:"mobile"},{categories:"computer"}] })
// //    console.log("mob",mobil)
// //    console.log("mob + c ",mobilsCom)
    
//     res.json({"mo":"mobil"})
// })

router.get('/page1',async(req,res)=>{
    const all =await Products.find()
    const cat =await Products.aggregate([{$group:{_id:"$categories",count:{$sum:1}}}])     
    res.json({"all":all,"datas":cat})
})

router.get('/categorie/:id',async(req,res)=>{
    const cate=req.params.id
    console.log("call");
    const categorie = await Products.find({categories:cate})
    const pro = await Products.aggregate([
        {$match:{categories:cate}},
        {$group:{_id:"$MC",count:{$sum:1}}}
    ])
    res.json({"cat":categorie,"pro":pro})
})

router.get('/subCategorie/:id',async(req,res)=>{
    const cate=req.params.id
    
    const categorie = await Products.find({MC:cate})
    
    const pro = await Products.aggregate([ 
        {$match:{MC:cate}},
        {$group:{_id:"$subcategories",count:{$sum:1}}}     
    ])
    res.json({"cat":categorie,"pro":pro})
})


router.get('/product/:id',async(req,res)=>{
    const cate=req.params.id
    console.log("call",cate);
    const products  = await Products.aggregate([ 
        {$match:{subcategories:cate}} ])   
    res.json(products)
})

router.post('/post',(req,res)=>{
    const {name , price} = req.body
    const products = new Products({
        name,
        price,
        // categories:"Mens fashion",
        // subcategories:"Lives",
        // MC:"Sports",

        // categories:"mobile, computers",
        // subcategories:"Plastic",
        // MC:"Case",
        
        categories:"TV, applications, Electronics",
        subcategories:"Sony",
       //Smart Phones   smart TV  ,Basic Phones , Android

         MC:"All Sound system",
       
        //basicphone:true,
       // allphone:"Smart Phones",
       // smartphone:true,
     
    })
    products.save()
    .then(result=>{
        console.log(result)
        res.json({prod:result})
    })    
    .catch(err => {         
        console.log(err);
    })
})


module.exports = router