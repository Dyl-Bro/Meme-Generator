const express = require('express');
require('dotenv/config');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./helper/error-handler');
const api = process.env.API_URL;


//middlewear
app.use(express.json());
app.use(morgan('tiny'));
app.use(errorHandler);
app.use(cors());
app.options('*', cors())//allowing everything (all http requests) to be passed

//ROUTERS
const memesRouter = require('./ROUTES/memes');
//ROUTES
app.use(`${api}/memes`, memesRouter);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

mongoose.connect(process.env.CONNECTION_STRING)//call mongoose.connect and pass connection string as parameter
.then(()=> {
    console.log('DATABASE CONNECTION IS READY')
})
.catch((err)=>{
    console.log(err);
})
app.listen(5000, ()=>{ //app/server is running on localhost:5000
    console.log(api);
    console.log('Server is now running in http://localhost:5000');
})
app.get('/favicon.ico', function(req, res) { 
    res.status(204);
    res.end();    
});
app.get("/", (req, res) => {
    res.send({ message: "We did it!" });
  });


module.exports = app;