require("dotenv").config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username:"jane",
        title:"post 1"
    },
    {
        username:"Deo",
        title:"post 2"
    },
    
]

app.get('/posts',authenticateToken, (req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

//Authentication
app.post('/login',(req,res)=>{

    //Authenticate User
   const username = req.body.username
   const user = {name: username}
   const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
   res.json({ accessToken:accessToken })
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      console.log('Token not provided');
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err);
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  }
  

app.listen(3000)