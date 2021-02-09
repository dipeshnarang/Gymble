const schedule=require('node-schedule')
const Slot=require('./../models/slotsSchema2')

const dateIST=function(){
    const curDate=new Date()
    curDate.setTime(curDate.getTime()+330*60*1000)
    let day=curDate.getDay()
    if(day==0){
        day=6
    }else{
        day=day-1
    }
    return day
}

const scheduleJob=async function(){
    const job=schedule.scheduleJob({hour:00,minute:00},async function(){

        const day=dateIST()
        const gyms=await Slot.find({day:day})
        if(gyms.length>0){
            gyms.forEach(async(gym)=>{
                if(gym.slots.length>0){
                    gym.slots.forEach((slot)=>{
                        slot.remaining_slots=slot.available_slots
                    })
                }
                console.log(gym)
                await gym.save()
            })
        }
        
    })
}


scheduleJob()