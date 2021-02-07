const express=require('express')
const Subscription=require('./../models/subscriptionSchema')

const router=new express.Router()

router.post('/newSubscription',async(req,res)=>{
    console.log("------------------------------------------------------------------------------------------NEW SUBSCRIPTION ACTIVATED-----------------------------------------------")
    const new_subscription=new Subscription(req.body)
    console.log(new_subscription)
    const user_id=req.body.user_id
    try{
        const existing_subscription=await Subscription.findOne({user_id:user_id})
        if(existing_subscription===null){
            await new_subscription.save()
            res.send(new_subscription)


        }else{

            existing_subscription.gym_id=new_subscription.gym_id
            existing_subscription.gym_name=new_subscription.gym_name
            existing_subscription.start_date=new_subscription.start_date
            existing_subscription.end_date=new_subscription.end_date
            existing_subscription.is_active=new_subscription.is_active
            existing_subscription.added_by=new_subscription.added_by
            await existing_subscription.save()
            res.send(existing_subscription)
        }
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/getSubscriptionDetails/:id',async(req,res)=>{
    try{
        const details=await Subscription.find({user_id:req.params.id})
        res.send(details)
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.get('/getAllSubscribers',async(req,res)=>{
    try{
        const subscribers=await Subscription.find({})
        res.send(subscribers)

    }catch(e){
        console.log(e)
        res.send(e)
    }
})

module.exports=router