const express=require('express')
const slotBooks=require('./../models/bookedSlotSchema2')
const Subscription=require('./../models/subscriptionSchema')
const Slot=require('./../models/slotsSchema2')


const router=new express.Router()
router.get('/cutomerBookingDetails',async(req,res)=>{
    console.log("------------------------------------------------GET CUSTOMER DETAILS ACCORDING TO TIME  ----------------WEB ROUTER")

    const gym_id=req.query.gym_id
    const date=new Date(req.query.date)
    console.log(date)
    const time=req.query.time
    try{
        const customers=await slotBooks.find({gym_id:gym_id,date:date,time:time},{customer_name:1,phone_no:1})
        res.send(customers)
    }catch(e){
        console.log(e)
        res.send(e)
    }
})


router.get('/customerBookingDetails2',async(req,res)=>{
    console.log("-------------------------------------------GET ALL CUSTOMER DETAILS FOR THE DAY --------------------- WEB ROUTER")
    const gym_id=req.query.gym_id
    const date=new Date(req.query.date)
    try{
        const customers=await slotBooks.find({gym_id:gym_id,date:date},{time:1,customer_name:1})
        res.send(customers)
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.get('/getGymTimings',async(req,res)=>{
    console.log("-------------------------------------------GET GYM TIMINGS --------------------- WEB ROUTER")
    const gym_id=req.query.gym_id
    const date=new Date(req.query.date)
    const day=date.getDay()
    console.log(day)
    try{
        const timings=await Slot.findOne({gym_id:gym_id,day:day})
	console.log(timings)
        res.send(timings)
    }catch(e){
        console.log(e)
        res.send(e)
    }

})

router.get('/getAllUsers',async(req,res)=>{
    console.log("----------------------------------------------------GET ALL USERS OF A GYM------------------------------------------------------------")
    const gym_id=req.query.gym_id
    try{
        const customerInfo=await Subscription.find({gym_id:gym_id,is_active:true},{customer_name:1,email:1,phone_no:1,gym_name:1,start_date:1,end_date:1})
        res.send(customerInfo)

    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

module.exports=router