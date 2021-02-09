const express=require('express')
const Slot=require('./../models/slotsSchema2')
const Subscription=require('./../models/subscriptionSchema')
const bookSlots=require('./../models/bookedSlotSchema2')
const getDate=require('./../middleware/date')
const bcrypt=require('bcrypt')
const compareTime=require('./../middleware/checkInTime')

const qrcode=require('qrcode')
const router=new express.Router()

router.post('/bookSlot2',async(req,res)=>{
    console.log("-------------------------------------------------------BOOK SLOT 2 API-------------------------------")
    const gym_id=req.body.gym_id
    const slot_id=req.body.slot_id
    const date=getDate(req.body.date)
    const day=date.getDay()
    const cur_date=new Date();
    cur_date.setTime(cur_date.getTime()+330*60*1000)
    console.log(cur_date)
    console.log("Day:"+day)

    try{
        const count=await bookSlots.countDocuments({'gym_id':gym_id,'date':date,'slot_id':slot_id})
        console.log("Document Count: "+count)
        const slot=await Slot.findOne({'gym_id':gym_id,'day':day,'slots':{$elemMatch:{'_id':slot_id}}},{'slots':{$elemMatch:{'_id':slot_id}}})
        // const slots=await Slot.findOneAndUpdate({'gym_id':canceledSlot.gym_id,'day':day,'slots':{$elemMatch:{'_id':canceledSlot.slot_id}}},{$inc:{'slots.$.remaining_slots':1}},{new:true})
        
        console.log("Slot from slot_bookRouter2 ----------------------------------------------------")
        console.log(slot)
        if(count<slot.slots[0].available_slots){
            const booking=new bookSlots({
                user_id:req.body.user_id,
                customer_name:req.body.customer_name,
                phone_no:req.body.phone_no,
                gym_id:gym_id,
                gym_name:req.body.gym_name,
                date:date,
                slot_id:slot_id,
                time:req.body.time,
                booking_status:req.body.booking_status,
                booking_date:cur_date,
                check_in_status:req.body.check_in_status,
                check_in_time:null
            })
            await booking.save()
            slot.slots[0].remaining_slots=slot.slots[0].remaining_slots-1
            console.log(slot)
            await slot.save()
            res.send(booking)
        }else{
            res.status(401).send("Slot Already Full")
        }
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.post('/cancelSlot2',async(req,res)=>{
    console.log("------------------------------------------------------------CANCEL SLOT 2 API---------------------------------")
    const object_id=req.body.object_id
    const date=new Date(req.body.date)
    const day=date.getDay()
    const gym_id=req.body.gym_id
    try{
        const slots=await Slot.findOneAndUpdate({'gym_id':canceledSlot.gym_id,'day':day,'slots':{$elemMatch:{'_id':canceledSlot.slot_id}}},{$inc:{'slots.$.remaining_slots':1}},{new:true})
        const canceledSlot=await bookSlots.findByIdAndDelete(object_id)
        res.send(slots)
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.post('/checkIn2',async(req,res)=>{
    console.log("----------------------------------------------------------CHECK IN 2-------------------------------------")
    const object_id=req.body.object_id
    const cur_time=req.body.cur_time
    const qr_code=req.body.qr_code
    const date=new Date()
    date.setTime(date.getTime()+330*60*1000)
    console.log(date)
    try{
        const booked_slot=await bookSlots.findOne({_id:object_id})
        const gymName=booked_slot.gym_name.trim().toLowerCase().replace(/\s+/g, '')
        const qrMatch=qr_code===gymName
        const time_compare=compareTime(booked_slot.time)
        const dateCompare=date>booked_slot.date
        console.log("is Matched: "+qrMatch)
        console.log("Date compared: "+dateCompare)
        console.log("Time Compare: "+time_compare)
        if(qrMatch===true && time_compare===true  && dateCompare===true){
            const slot=await bookSlots.findOneAndUpdate({_id:object_id},{$set:{check_in_status:true,check_in_time:cur_time}},{new:true})
            res.send(slot)
        }else{
            res.status(401).send(booked_slot)
        }
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/timeline2',async(req,res)=>{
console.log("----------------------------------------------------------------------------------TIMELINE 2 NEW")
    const user_id=req.query.user_id
    try{
        const subscription_details=await Subscription.findOne({user_id:user_id, is_active:true})
        if(subscription_details!=null){
            const date=subscription_details.start_date
            const previous_bookings=await bookSlots.find({user_id:user_id, date:{$gte:subscription_details.start_date}},{date:1,time:1,check_in_status:1,check_in_time:1,booking_date:1})
            previous_bookings.sort(function(a,b){
                if(a.date>b.date){
                    return -1
                }else{
                    return 1
                }
            })
            res.send(previous_bookings)
        }else{
            res.send('NO ACTIVE SUBSCRIPTION')
        }
        
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

module.exports=router