const date_function=function(requestedDate){
    console.log("----------------------------------------------------FROM DATE.JS FUNCTION-----------------------------")
    let date=new Date()
    console.log(date)
    // date.setTime(date.getTime()+5*60*60*1000+30*60*1000)
    const requested_date=parseInt(requestedDate)
    console.log(requested_date)
    console.log("Date : "+date.getDate())
    console.log("Month :"+date.getMonth())

    const month=date.getMonth()
    if(month===0 || month===2 || month===4 || month===6 || month===7 || month===9 || month===11){
        let difference=0
        if(requested_date<date.getDate()){
            difference=31-date.getDate()+requested_date
            
        }else{
            difference=requested_date-date.getDate()
        }
        console.log(difference)
        date.setDate(date.getDate()+difference)
        // console.log(date)


    }else if(month==3 || month==5 || month==8 || month==10){
        let difference=0
        if(requested_date<date.getDate()){
            difference=30-date.getDate()+requested_date

        }else{
            difference=requested_date-date.getDate()
        }
        date.setDate(date.getDate()+difference)
    }else if(month==1){
        let difference=0
        
        if(requested_date<date.getDate()){
            if(date.getFullYear()%4==0){
                console.log('leap')
                difference=29-date.getDate()+requested_date
            }else{
                difference=28-date.getDate()+requested_date
            }
            console.log(difference)
        }else{
            difference=requested_date-date.getDate()
        }
        date.setDate(date.getDate()+difference)

    }
    date.setHours(0,0,0,0)
    date.setTime(date.getTime()+5*60*60*1000+30*60*1000)
    return date

}

module.exports=date_function




