var mongoose = require("mongoose");

var userSchema2 = mongoose.Schema({
    
    username:{type:String},

    password:{type:String},

    email:{type:String},

    fname:{type:String},

    lname:{type:String},


},{versionKey:false})

module.exports = mongoose.model("pplcollection",userSchema2)