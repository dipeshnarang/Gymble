const mongoose=require('mongoose')

const subscriptionSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    customer_name:{
        type:String,
	    //required:true

    },
    email:{
	type:String,
	    //required:true
    },
    phone_no:{
        type:String,
	    //required:true

    },
    gym_id:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    gym_name:{
        type:String
    },
    start_date:{
        type:Date,
	    required:true

    },
    end_date:{
        type:Date,
	    required:true

    },
    is_active:{
        type:Boolean
    },
    added_by:{
        type:Number
    }
})

const Subscription=mongoose.model('Subscription',subscriptionSchema)

module.exports=Subscription