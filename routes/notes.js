const express = require('express')
const router = express.Router()
const upload = require('../middleware/uploadMiddleware')
const Note = require('../models/note')
const {marked} = require("marked")

router.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message: 'No file uploaded'})
    }
    res.status(200).json({
        message:"File uploaded successfully",
        file:{
            filename:req.file.filename,
            path:req.file.path
        }
    })
})

router.post('/create', async (req,res)=>{
 const {title,content} = req.body
 try{
 if(!title||!content){
    return res.status(400).json({message:"Title and content are required"})
 }
 const newNote = new Note({
    title,
    content
 })
 await newNote.save()
 return res.status(201).json({
    message:"Note created Successfully",
    newNote: {
        id: newNote._id,
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt
    }
    
 })}
 catch(err){
    console.log(err)
    return res.status(500).json({message:"Internal Server Error"})
 }

});

router.post('/render',(req,res)=>{
    const {markdown} = req.body
    if (!markdown){
        return res.status(400).json({message:"Markdown content is required"})

    }
    try{
        const htmlContent = marked(markdown)
        return res.status(200).json({
            message:"Markdown rendered successfully",
            markdown:markdown,
            html:htmlContent

        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"Error rendering markdown"})
    }

});

module.exports = router