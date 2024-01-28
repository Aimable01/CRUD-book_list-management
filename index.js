//import and use express js
const express = require('express')
const app = express()

//route to the books model
const Book = require('./models/model')
//import the middle ware to be used
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//create post some data into the db
app.post('/books', async(req,res)=>{
    try {
        const book = await Book.create(req.body)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//read get all the books from the db
app.get('/books', async(req,res)=>{
    try {
        const books = await Book.find({})
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//read get a single book from the db
app.get('/books/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update put a certain book
app.put('/books/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id, req.body)

        if(!book) console.log(`Book with id ${id} not found`)
        
        const updatedBook = await Book.findById(id)
        res.status(200).json(updatedBook)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//import and use mongo db
const mongoose = require('mongoose')
mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://aimable:aimable@cluster0.y5yakew.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to mongodb successfully')
    app.listen(4000,()=>console.log(`Server running on port 4000`))
}).catch(err =>{
    console.log(`Error: ${err.message}`)
})