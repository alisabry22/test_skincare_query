

const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title:{type: String, required: true ,trim:true,index:true},
    brand:{type: String, required: true ,trim:true,index:true},
    categories:[{type: String, required: true ,trim:true,index:true}],
    link:{type: String, required: true ,trim:true,unique:true},
    image:{type:String,trim:true,default:null},
    ingredients_list:[{type:String,trim:true,index:true}],
    ingredient_info:[{
        name:{type:String,trim:true,default:null},
        functions:{type:String,trim:true,default:null},
        concerns:{type:String,trim:true,default:null},
    }],
    ingredientsFromPackaging:{type:String,trim:true,default:null},
    source:{type:String,trim:true,default:"ewg"}
}, { timestamps: true })



const Product = mongoose.model('productv2', ProductSchema)

module.exports = Product