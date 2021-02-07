const express=require('express')
const gymRouter=require('./Routers/gymRouter')
// const slotSetRouter=require('./Routers/slotSetRouter')
const slotSetRouter2=require('./Routers/slotSetRouter2')
// const slotSetRouter3=require('./Routers/slotSetRouter3')
const subscriptionRouter=require('./Routers/subscriptionRouter')
// const slotBookRouter=require('./Routers/slot_bookRouter')
const slot_bookRouter2=require('./Routers/slot_bookRouter2')
// const slot_bookRouter3=require('./Routers/slot_bookRouter3')
const webRouter=require('./Routers/webRouter')
require('./databaseConnection/mongoose')
require('./scheduled-jobs/scheduledJobs')

const app=express()

app.use(express.json())

app.use(gymRouter)
// app.use(slotSetRouter)
app.use(subscriptionRouter)
// app.use(slotBookRouter)
app.use(slotSetRouter2)
// app.use(slotSetRouter3)
app.use(slot_bookRouter2)
// app.use(slot_bookRouter3)
app.use(webRouter)

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(3000,()=>{
    console.log('Running on port 3000')
})