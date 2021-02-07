const mongoose=require('mongoose')

const slotSchema2=new mongoose.Schema({
    gym_id:{
        type:mongoose.Types.ObjectId
    },
    gym_name:{
        type:String
    },
    day:{
        type:Number
    },
    slots:[{
        start_time:{
            type:String
        },end_time:{
            type:String
        },available_slots:{
            type:Number
        },remaining_slots:{
            type:Number
        }
    }]
})

const Slot2=mongoose.model('Slot2',slotSchema2)

module.exports=Slot2