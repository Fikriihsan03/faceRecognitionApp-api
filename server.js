const express = require('express');
const bodyParser =require('body-parser')
const  session = require('express-session');
const cookieParser =require('cookie-parser');
const bcrypt = require('bcrypt-nodejs');
const cors =require('cors');
const knex =require('knex');


const SignIn = require('./controllers/signin')
const Register = require('./controllers/register')
const Home = require('./controllers/home');
const Rank = require('./controllers/rank');


const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'fikri',
      password : 'fimarasa',
      database : 'smart-brain'
    }
})

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
// app.use(session({secret:"very secret"}))
const database ={
    user:[
        {
           id:"123",
           name:"john",
           email:"john@gmail.com" ,
           password :"terserah",
           entries:0,
           joined:new Date()
        },
        {
            id:"124",
            name:"dodi",
            email:"dodi@gmail.com" ,
            password :"whatever",
            entries:0,
            joined:new Date()
        }
    ]
}

// app.get('/',(req,res)=>{
//   console.log(req.session.signin)
//    if(req.session.signin){
//     //  req.session.signin++;
//      res.send("you already sign in")
//    }else{
//      res.send("belom signin")
//    }
// })

app.post('/signin', (req, res) => {SignIn.handleSignIn(req,res,db,bcrypt)});

app.post('/register',(req,res) =>{Register.handleRegister(req,res,db,bcrypt)});
            
app.get('/home/:id',(req,res)=> {Home.GetHome(req,res,db)})

app.put('/rank',(req,res)=>{Rank.handleRank(req,res,db)})
app.post('/rankApi',(req,res)=>{Rank.handleApiCall(req,res)})


app.listen(3001,()=>{
    console.log("server is running on port 3001")
})