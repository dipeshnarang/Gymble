const express=require('express')
const Gym=require('../models/gymSchema')
const qrcode=require('qrcode')
const bcrypt=require('bcrypt')


const router=new express.Router()

router.get('/slot',async(req,res)=>{
    res.send("From slots router")
})

router.post('/registerGym',async(req,res)=>{
    const gym=new Gym({...req.body,
			qr_code_url:null})
    try{
        const gym_saved=await gym.save()
	    const gym_id=JSON.stringify(gym_saved._id)
	    console.log(gym_id)
        const hash= await bcrypt.hash(gym_id,8)
        console.log(hash)
        const qr_code_url=await qrcode.toDataURL(hash.toString())
        gym_saved.qr_code_url=qr_code_url
        await gym_saved.save()
	    console.log(gym_saved)
        res.send(gym_saved)
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

router.patch('/addQrCodeGym',async(req,res)=>{
    const gym_id=req.query.gym_id
    const hash=await bcrypt.hash(gym_id,8)
    console.log(hash)
    const qr_code_url=await qrcode.toDataURL(hash.toString())
    // console.log(qr_code_url)
    try{
        //const gym=await Gym.findByIdAndUpdate(gym_id,{$set:{'qr_code_url':qr_code_url}})
	const gym=await Gym.findById(gym_id)
        console.log(gym)
        gym.qr_code_url=qr_code_url
        await gym.save()
        res.send(qrcode.toString(qr_code_url))
        
    }catch(e){
        res.send(e)

    }

})

router.get('/getQRcode',async(req,res)=>{
    const gym_id=req.query.gym_id
    const url=await Gym.findOne({_id:gym_id},{qr_code_url:1,_id:1})
    let qr=url.qr_code_url.substring(22)
    res.status(401).send(qr)

    //const url=await Gym.findOne({_id:gym_id},{qr_code_url:1,_id:0})
    //res.status(201).send(url.qr_code_url)
    //res.send(url.qr_code_url)
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