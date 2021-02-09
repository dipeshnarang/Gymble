const express=require('express')
const Slot=require('./../models/slotsSchema2')
const checkSubscription = require('../middleware/checkSubscription')
const bookSlots=require('./../models/bookedSlotSchema2')
const filterTimings=require('../middleware/time')


const router=new express.Router()


router.post('/createSlot2',async(req,res)=>{
    const slot2=new Slot(req.body)
    const gym_id=req.body.gym_id
    const day=req.body.day
    
    try{
        const already_created=await Slot.findOne({gym_id:gym_id, day:day})
        if(already_created===null){
	    console.log("---------------------------------CREATE SLOT 2---------------------- NEW CREATED---------------------")
            await slot2.save()
            res.send(slot2)
        }else{
	    console.log("---------------------------------CREATE SLOT 2---------------------- ALREADY CREATED UPDATED---------------------")
            already_created.slots=req.body.slots
            await already_created.save()
            res.send(already_created)
        }
        
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.get('/getSlotsByDate2',checkSubscription,async(req,res)=>{

    console.log("--------------------------------------------------------------------------------GET SLOTS BY DATE 2---------------------")
    const gym_id=req.gym.gym_id
    const date=req.date
    const day=date.getDay();
    const user_id=req.query.user_id
    const is_active=req.gym.is_active
    console.log("day: "+day)
    console.log("gym: "+gym_id)
    console.log("date:"+ date)

    try{
        const already_booked=await bookSlots.findOne({user_id:user_id,gym_id:gym_id,date:date,booking_status:true})
        if(already_booked===null){
            const slots=await Slot.findOne({'gym_id':gym_id,'day':day})
	        const todays_date=new Date().getDate()
            if(todays_date===date.getDate()){
                const filtered_slots=slots.slots.filter(function(slot){
                    console.log(filterTimings(slot.start_time))
                    return filterTimings(slot.start_time)
                })
                slots.slots=filtered_slots
                
            }
            console.log(slots)
            res.send({'is_active':is_active,'booked':false,'days_left':req.days_left,slots})
        }else{
            res.send({'is_active':is_active,'booked':true,'days_left':req.days_left,already_booked})
        }

    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.patch('/addRemaining',async(req,res)=>{
    const id=req.body.id
    try{
        const gymSlot=await Slot.findById(id)
        gymSlot.slots.forEach((slot)=>{
            slot.remaining_slots=slot.available_slots
        })
        await gymSlot.save()
        res.send(gymSlot)
    }catch(e){
        res.send(e)
    }
})

router.get('/getSlotsByWeek',checkSubscription,async(req,res)=>{

    const subscription=req.gym
    const cur_date=req.date

    try{
        const last_date=cur_date.getDate()+6
        let slots=null
        if(last_date<subscription.end_date){
            slots=await Slot.find({'gym_id':subscription.gym_id})
        }
        console.log(slots)
        res.send(slots)


    }catch(e){

    }
})

module.exports=router