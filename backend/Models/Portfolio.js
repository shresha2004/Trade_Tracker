const mongoose=require("mongoose")
const Schema=mongoose.Schema 

const PortfolioSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserDetail',
        required:true
    },
    Symbol:{
        type:String,
        required:true,
        
    },
    EntryPrice:{
        type:Number,
        required:true
    },
    StopLoss:{
        type:Number
    },
    Target:{
        type:Number
    },
    Quantity:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('Portfolio',PortfolioSchema)