const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./product");
const Ingredient=require('./ingredient');
const fs = require('fs');

var {parse} = require('csv-parse');

const writeStream = fs.createWriteStream('data.csv');

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
const slugify = (ingredient) => {
    try {
        let str = ingredient.replace(/(\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?%)/g, '').trim();
        str = str.split(/\W+/).join("-");
        str = str.toLowerCase()
        return str;
    } catch (e) {
        return ingredient;
    }
}

async function getAll(){

   try {
    const query=  Product.find({}).select("-_id ingredients_list");
    const result =await query.exec();
    //get all ingredients_info ids
    let ids=[];
    for(let i=0;i<result.length;i++){
        for(let j=0;j<result[i].ingredients_list.length;j++){
            ids.push(slugify(result[i].ingredients_list[j]));
    }
    //now i have the ids from all ingredients_info , i
    // Step 3: Query the Ingredient collection for ingredients not in the IDs list
  
    } 
    // Step 4: Query the Ingredient collection for missing ingredients
  const ingredients=  await Ingredient.find({}).exec();
    
    const missingIngredients = ids.filter(ingred => !ingredients.some(ingredient => ingredient.slug === ingred));
    
    
   const uniqueMissingIngredients = [... new Set(missingIngredients)];
    
    const csvData = uniqueMissingIngredients.join('\n');
    const csvHeader = "Ingredient Slug\n";

    // Write the CSV data to the file
    writeStream.write(csvHeader + csvData);

    // Close the write stream
    writeStream.end();



    console.log('Missing ingredients have been written to data.csv')
    

    // // Return or process the missing ingredients as needed
    // console.log(missingIngredients);
}catch (error) {
    console.log(error)
}
}

var inputFile='products.csv';
var products=[];

const processFile = async (filePath) => {
    const records = [];
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({
      // CSV options if any
      }));
    for await (const record of parser) {
      // Work with each record
      records.push(record);
    }
    return records;
  };

async function loadData(){
    let records=await processFile(inputFile);
console.log(records);

}
loadData();
//getAll();
    




app.listen(3000, () => console.log('server running at 3000'));