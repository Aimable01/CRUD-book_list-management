const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type:String,
        required:true
    },
    isbn:{
        type:Number,
        required: true
    }
},{
    timeStamp:true
})

const book = mongoose.model('book',bookSchema)
module.exports = book