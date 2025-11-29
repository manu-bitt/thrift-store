const mongoose=require('mongoose')
const schema= new mongoose.schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    type:{
            type:String,
            required:true,
            trim:true
        }
    ,
    level:{
        type:Number,
        required:true,
        min:1
    },
    trainer:{
        type:String,
        trim:true
    }
})

const Pokemon=mongoose.model('Pokemon',schema)
module.exports=Pokemon