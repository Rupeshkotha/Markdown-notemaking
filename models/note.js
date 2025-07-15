const express = require("express")
const mongoose  = require("mongoose")
require('dotenv').config()

const notes = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Note',notes)