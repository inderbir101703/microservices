const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const axios=require('axios')
const app=express()
app.use(cors())
app.use(bodyParser.json())


app.post('/events',async (req,res,next)=>{
const {id ,status,content,postId}=req.body
let cont=content
let setStatus='accepted'
if(status=='pending' && content.includes('orange'))
    { setStatus='rejected'
        cont=null
    }
console.log('moderating the comment',req.body,setStatus,content)
await axios.post(`http://event-bus-srv:4005/events`,{
    type:'commentModerated',
    status:setStatus,
    id,
    content:cont,
    postId
}).catch((err) => {
    console.log(err.message);
  })
//   await axios.post(`http://localhost:4006/events`,{
//     type:'postCreated',
//     data:{id,title}
// })
 
    res.send({})
})

app.listen(4022,()=>{
    console.log('moderation is up on 4022')
})