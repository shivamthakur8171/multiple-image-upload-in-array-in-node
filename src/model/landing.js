const mongoose = require ('mongoose');

//create a schema for group;
const landingSchema = new mongoose.Schema({
    title : {
       type: String,
    },
    description : {
        type :String,
    },
    subTitle : {
        type : String,
    },
    image : {
        type : Array 
    }
},{timestamps : true})

// create a collection using Models
module.exports= new mongoose.model("landing",landingSchema);