const mongoose=require("mongoose")
const Schema=mongoose.Schema

const JournalSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true
    },
    date: {
        type:String,
        required:true
    },
    type: {
        type:String,
        required:true
    },
    instrument: {
        type:String,
        required:true
    },
    tradeType: {
        type:String,
        required:true
    },
    entryPrice: {
        type:Number,
        required:true
    },
    exitPrice: {
        type:Number,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    strategy: {
        type:String,
        required:true
    },
    notes: {
        type:String,
        required:true
    },
    beforeScreenshotUrl: {
        type:String,
        required:true
    },
    afterScreenshotUrl: {
        type:String,
        required:true
    }
})
module.exports=mongoose.model('JournalSchema',JournalSchema)
