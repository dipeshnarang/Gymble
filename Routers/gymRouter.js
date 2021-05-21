const express=require('express')
const Gym=require('../models/gymSchema')
const qrcode=require('qrcode')

const router=new express.Router()

router.post('/registerGym',async(req,res)=>{
    const gym=new Gym({...req.body,
			qr_code_url:null})
    try{
        const qr=gym.gym_name.trim().toLowerCase().replace(/\s+/g, '')
        gym.unique_qr_str=qr
        const qr_code_url=await qrcode.toDataURL(qr)
        gym.qr_code_url=qr_code_url
        await gym.save()
        res.send(gym)
    }catch(e){
        res.send(e)
    }
})

router.get('/getAllGyms',async(req,res)=>{
    console.log("GET ALL GYMS -------------------------------------------------------------------------------------------------------------------")

    try{
        const gym=await Gym.find({},{'gym_name':1,'gym_image':1,'address':1,'subscription_fees':1})
        console.log('get all gyms -- home page')
        res.send(gym)
    }catch(e){
        console.log(e)
        res.send(e)
    }

})

router.get('/getAllGyms/:id',async(req,res)=>{
    console.log("GET GYM DETAILS-------------------------------------------------------------------------------------------------------------------")
    try{                                           
        const gym=await Gym.findById(req.params.id,{qr_code_url:0,subscriptions:0})
        console.log('get gym details by id'+req.params.id)
        res.send(gym)
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

router.get('/getGymSubcriptionDetails',async(req,res)=>{
    const gym_id=req.query.gym_id
    try{
        const gym=await Gym.findById(gym_id,{gym_name:1,subscriptions:1})
        console.log(gym)
        res.send(gym)

    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/getQRcode',async(req,res)=>{
    const gym_id=req.query.gym_id
    try{
        const url=await Gym.findOne({_id:gym_id},{qr_code_url:1,_id:1})
        let qr=url.qr_code_url.substring(22)
        res.status(200).send(qr)
    }catch(e){
        res.status(400).send(e)
    }
})


router.patch('/gymDataUpdate/:id',async(req,res)=>{
    const updates=Object.keys(req.body)

    try{
        const gym=await Gym.findById(req.params.id)
        updates.forEach((update)=>{
            gym[update]=req.body[update]
        })
        gym.save()
        res.send(gym)  
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})


module.exports=router