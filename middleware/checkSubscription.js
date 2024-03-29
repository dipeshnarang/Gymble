const express=require('express')
const Subscription=require('./../models/subscriptionSchema')
const date_function=require('./date')

const checkSubscription=async(req,res,next)=>{
    console.log("Runnning Check Subscription MiddleWare Function -----------------------------------------------------------------------")
    const user_id=req.query.user_id
    const cur_date=new Date()
    const query_date=date_function(req.query.date)

    try{
        const subscription_details=await Subscription.find({user_id:user_id, is_active:true})
        let active_subscription=null        
        
        subscription_details.forEach(async function (each_subscription){
            try{
                if(each_subscription.end_date<cur_date){
                    await Subscription.findByIdAndUpdate(each_subscription._id,{'is_active':false})
                }else if(each_subscription.end_date>=cur_date){
                    active_subscription=each_subscription  
                }
            }catch(e){
                console.log(e)
            }
            
        })
        console.log("PRINTING ACTIVE SUBSCRIPTION---------------------------------")
        console.log(active_subscription)

        if(active_subscription===null){
            throw new Error()
        }

        if(active_subscription.end_date<query_date){
            throw new Error('subscription not active for this date')
        }

	    const days=active_subscription.end_date-cur_date
        const divisor=24*60*60*1000
        const days_left=parseInt(days/divisor)

        req.gym=active_subscription
        req.date=query_date
        req.days_left=days_left


        next()
    
    }catch(e){
        res.status(401).send({'is_active':false,"booked":false,"slots":null})
    }
}

module.exports=checkSubscription
