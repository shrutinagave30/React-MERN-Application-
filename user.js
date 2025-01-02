const mongoose=require('mongoose')

const user=new mongoose.Schema({
    username:String,
    password:String,
    mob:Number,
    email:String
})

module.exports = mongoose.model('Customers', user);