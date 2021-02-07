const CheckInTime=function(time){
    console.log("-------------------------------------------------------FROM CHECK IN TIME FUNCTION--------------")
    console.log("paased time: "+time)
    let cur_time=new Date()
    let cur_hours=cur_time.getHours()
    let cur_minutes=cur_time.getMinutes()
    let time_hours=parseInt(time.substr(0,2))
    let time_minutes=parseInt(time.substr(3,5))
    if(time.substr(6,8)==="pm"){
        time_hours+=12
    }
    console.log("cur_time:")
    console.log(cur_hours)
    console.log(cur_minutes)
    console.log("time: ")
    console.log(time_hours)
    console.log(time_minutes)

    let upper_range_m;
    let upper_range_h
    let lower_range_m;
    let lower_range_h


    if(time_minutes>=15){
        lower_range_m=time_minutes-15
        lower_range_h=time_hours
    }else if(time_minutes<15){
        lower_range_m=time_minutes+45
        lower_range_h=time_hours-1

    }

    if(time_minutes<30){
        upper_range_m=time_minutes+30
        upper_range_h=time_hours
    }else if(time_minutes>=30){
        upper_range_m=time_minutes-30
        upper_range_h=time_hours+1
    }

    console.log("lower range minutes: "+lower_range_m)

    console.log("lower range hours: "+lower_range_h)
    console.log("upper range minutes: "+upper_range_m)

    console.log("upper range hours: "+upper_range_h)


    if(cur_hours>=lower_range_h && cur_hours<=upper_range_h){
        if(cur_minutes>=lower_range_m && cur_hours===lower_range_h){
            return true
        }else if(cur_minutes<=upper_range_m && cur_hours===upper_range_h){
            return true
        }
    }
    return false
}

module.exports=CheckInTime