const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

const authRoute = require('./routes/RouteAuth')
const {requireAuth,checkUser} = require('./middleware/authMiddleware');


require('dotenv').config()
// middleware
app.use(express.json());
app.use(cookieParser());
// const port = 9000


// view engine
app.use(express.urlencoded({extended: false}))
app.use("/public", express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.set('views', './view')



// app.use(authRoute)
// connect to database
mongoose.connect(process.env.MONGO_URL).then(()=>{

    // listern to request
    app.listen(process.env.PORT, () => {
        console.log(`connect to db && listening on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})

app.get('*',(req,res)=>{
    res.send('Not found page')
})

app.get('/',requireAuth, (req, res) => {
    res.send('Welcome')
})

app.use(authRoute)

