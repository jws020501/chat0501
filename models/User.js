const express = require("express");
var mongoose = require('mongoose');


var userschema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
})
    var User = mongoose.model('User',userschema);
    module.exports = User;