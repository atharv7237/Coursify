const express = require('express')
const mongoose = require('mongoose')

mongoose
.connect(`${process.env.MONGO_URI}`)
.then(()=>{
    console.log('connected to database')
})
.catch((err)=>{
    console.log("Error Occurred :",err.message)
}
)


module.exports = mongoose.connection

