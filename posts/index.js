const express=require('express')
const cors=require("cors")
const {randomBytes}=require('crypto')
const axios=require('axios')
const bodyParser=require('body-parser')
const app=express()
app.use(cors())
app.use(bodyParser.json())
const posts={}

app.get('/posts',(req,res,next)=>{ 
    console.log('heeh')
res.send(posts)
})
app.post('/events',(req,res,next)=>{
    console.log(req.body,'getting this from bus in posts')
    res.send({})
}) 
app.post('/posts/create',async (req,res,next)=>{
    const {title}=req.body
    const id=randomBytes(4).toString('hex')
    posts[id]={id,title}
    await axios.post(`http://event-bus-srv:4005/events`,{
        type:'postCreated',
        data:{id,title}
    })
    res.status(201).send(posts[id])
})
app.listen(4000,()=>{
    console.log('posrt is listening on port 4000')
}) 