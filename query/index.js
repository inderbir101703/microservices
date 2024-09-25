const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
app.use(bodyParser.json())
app.use(cors())
const posts={}
app.post('/events',(req,res,next)=>{
const {type }=req.body
if(type=='postCreated'){
    const {data}=req.body
    const {id,title}=data
    posts[id]={id,title,comments:[]}
}
if(type=='commentCreated'){
    const {content,postId,id,status}=req.body
  const {comments}=posts[postId]
  comments.push({content,id,status})
}
if(type=='commentUpdated'){

    const {content,postId,id ,status}=req.body
    posts[postId].comments=content
  console.log('updayed content',req.body,status)
  
}  
res.send([]) 
})
app.get('/posts',(req,res,next)=>{
 res.send(posts)
})
app.listen(4010,()=>{ 
    console.log('query service is up on port 4010')
}) 