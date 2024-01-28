const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('welcome to express js auto restart and see')
})

app.listen(4000,()=>console.log(`Server running on port 4000`))