<<<<<<< HEAD
require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const usersRouter = require('./routers/user.route');
const coursesRouter = require('./routers/course.route');
const port = process.env.PORT;
const url = process.env.MONGO_URL;
const cors = require('cors');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
mongoose.connect(url).then(()=>{
    console.log('MONGOOSE Connected successfully to server');
});




app.use('/api/users',   usersRouter);
app.use('/api/courses', coursesRouter);
app.use((error,req,res,next)=>{res.json(error)});
app.all('*',(req,res)=>{
    res.status(404).json({status : "Fail" , data : 'Route not found'});
});



app.listen(port,()=>{
    console.log('Listening on port 7001');
});

=======
require('dotenv').config()

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const usersRouter = require('./routers/user.route');
const coursesRouter = require('./routers/course.route');
const port = process.env.PORT;
const url = process.env.MONGO_URL;
const cors = require('cors');
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
mongoose.connect(url).then(()=>{
    console.log('MONGOOSE Connected successfully to server');
});




app.use('/api/users',   usersRouter);
app.use('/api/courses', coursesRouter);
app.use((error,req,res,next)=>{res.json(error)});
app.all('*',(req,res)=>{
    res.status(404).json({status : "Fail" , data : 'Route not found'});
});



app.listen(port,()=>{
    console.log('Listening on port 7001');
});

>>>>>>> 4361934 (first commit : initial version create for CS50)
