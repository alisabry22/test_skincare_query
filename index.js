const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./product");

require('dotenv').config();
mongoose.set('strictQuery', false);
console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('connected', () => {
    console.log('MongoDB has connected succesfully')
})

mongoose.connection.on('error', error => {
    console.log('MongoDB connection has an error', error)
    mongoose.disconnect()
})

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection is disconnected')
})

async function getAll(){

   try {
    const query=  Product.findById('66200e39c60171587a51cb30');
    const result =await query.exec();
    console.log(result)
    } catch (error) {
        console.log(error)
    }
} 



getAll();
    




app.listen(3000, () => console.log('server running at 3000'));