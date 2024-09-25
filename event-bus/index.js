const express=require("express")
const bodyParser=require('body-parser')
const axios=require("axios")

const app=express()
app.use(bodyParser.json())
app.post('/events',(req,res,next)=>{

    const event=req.body
    console.log('event recieved',event)

        axios.post(`http://post-clusterip-srv:4000/events`,event)
      axios.post(`http://comments-srv:4009/events`,event)
      axios.post(`http://moderation-srv:4022/events`,event)
     axios.post(`http://query-srv:4010/events`,event)
    
res.send({status:'OK'})
})

app.listen(4005,()=>{
    console.log('listening on bus')
})  