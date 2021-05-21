const mongoose=require('mongoose')

const Slot=new mongoose.Schema({
    gymId:{
        type:mongoose.Types.ObjectId
    }
})