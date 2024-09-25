const express=require("express")
const bodyParser=require("body-parser")
const {randomBytes}=require("crypto")
const axios=require('axios')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(bodyParser.json())
const commentsByPostId={}
app.get('/posts/:id/comments',(req,res)=>{
const id=req.params.id
res.send(commentsByPostId[id])
})
app.post('/events',async (req,res,next)=>{
    console.log(req.body,'getting this in bus')
    if(req.body?.type=='commentModerated'){
        const { postId,content,id,status}=req.body
        let comments=commentsByPostId[postId]
        for(let comment of comments){
            if(comment?.id==id){
              comment.content=content
            comment.status=status}
            }
        console.log('consoling',commentsByPostId[postId])
        await axios.post(`http://event-bus-srv:4005/events`,{
            type:'commentUpdated',
            content:commentsByPostId[postId],
            id,
            postId,
            status 
     
        }).catch((err)=>{console.log('faing erro')})
    }
    res.send({}) 
})
app.post('/posts/:id/comments',async (req,res)=>{
    const postId=req.params.id

    const {content}=req.body
    const comments=commentsByPostId[postId]|| []
    const commentId=randomBytes(4).toString('hex')
    comments.push({id:commentId,content,status:'pending'})
    commentsByPostId[postId]=comments
    await axios.post(`http://event-bus-srv:4005/events`,{
        type:'commentCreated',
        content,
        id:commentId,
        postId:req.params.id,
        status:'pending'

    })
    console.log(commentsByPostId)
    res.status(201).send(comments)
})
app.listen(4009,()=>{
    console.log('listeing to port 4009 comments')
}) 