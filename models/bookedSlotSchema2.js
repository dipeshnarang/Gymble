const mongoose=require('mongoose')

const slotBookSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    customer_name:{
        type:String
    },
    phone_no:{
        type:String
    },
    gym_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    gym_name:{
        type:String
    },
    date:{
        type:Date
    },
    slot_id:{
        type:mongoose.Types.ObjectId,
        required:true 
    },
    time:{
        type:String
    },
    booking_status:{
        type:Boolean
    },
    booking_date:{
        type:Date
    },
    check_in_status:{
        type:Boolean
    },
    check_in_time:{
        type:String
    }
})

const SlotBook=mongoose.model('SlotBook2',slotBookSchema)
module.exports=SlotBook