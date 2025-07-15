const express = require('express');
const app = express()
const notesRoutes = require('./routes/notes')
const mongoose = require('mongoose')
require('dotenv').config()


app.use(express.json())
const PORT = process.env.PORT
app.use('/api/notes',notesRoutes)
app.get('/',(req,res)=>{
    res.send("Welcome to the Markdown App API")
})
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.listen(PORT,()=>{
    console.log("Markdown App API running "+ PORT);
})