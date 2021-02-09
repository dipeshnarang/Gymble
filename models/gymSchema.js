const mongoose=require('mongoose')

const gymSchema=new mongoose.Schema({
    gym_owner_id:{
        type:String
    },
    gym_name:{
        type:String,
        trim:true,
        required:true
    },
    address:{
        type:String,
        trim:true
    },
    subscription_fees:{
        type:String,
        trim:true
    },
    subscriptions:[{
        duration:{
            type:Number
        },
        price:{
            type:String,
            trim:true
        }
    }],
    description:{
        type:String,
        trim:true
    },
    gym_image:{
        type:String
    },
    images_array:[{
        image:{
            type:String
        }
    }],
    morning_slots:[{
        start_time:{
            type:String,
            trim:true
        }
    }],
    evening_slots:[{
        start_time:{
            type:String,
            trim:true
        }
    }],
    Amenities:[{
        amenity:{
            type:String
        },
        amenity_image:{
            type:String
        }
    }],
    Trainers:[{
        trainer_name:{
            type:String
        },
        trainer_image:{
            type:String
        },
        trainer_description:{
            type:String
        }
    }],
    unique_qr_str:{
        type:String,
        trim:true

    },
    qr_code_url:{
        type:String
    }

    
})

const Gym=mongoose.model('Gym',gymSchema)

module.exports=Gym