const getTime=function(time){
    console.log("-------------------------------------------------------FROM NEW TIME FUNCTION--------------")
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

    if(cur_hours<time_hours){
        return true
    }else if(cur_hours===time_hours){
        if(cur_minutes<time_minutes){
            return true
        }
    }
    return false

}


module.exports=getTime



