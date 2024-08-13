const mongoose = require('mongoose')

const IngredientSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    image:{ type: String },
    slug: { type: String, required: true, trim: true, unique: true },
    references:[{ type: String, trim: true }],
    score:{type:Number}
}, { timestamps: true })



const Ingredient = mongoose.model('IngredientV2', IngredientSchema)

module.exports = Ingredient