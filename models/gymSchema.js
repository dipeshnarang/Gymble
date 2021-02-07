const mongoose=require('mongoose')

const gymSchema=new mongoose.Schema({
    
    gym_name:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    subscription_fees:{
        type:String
    },
    subscriptions:[{
        duration:{
            type:Number
        },
        price:{
            type:String
        }
    }],
    description:{
        type:String
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
            type:String
        }
    }],
    evening_slots:[{
        start_time:{
            type:String,
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
    qr_code_url:{
        type:String
    }

    
})

const Gym=mongoose.model('Gym',gymSchema)

module.exports=Gym