const express = require('express');
const app = express()
const notesRoutes = require('./routes/notes')
require('dotenv').config()


app.use(express.json())
const PORT = process.env.PORT
app.use('/api/notes',notesRoutes)
app.get('/',(req,res)=>{
    res.send("Welcome to the Markdown App API")
})
app.listen(PORT,()=>{
    console.log("Markdown App API running "+ PORT);
})