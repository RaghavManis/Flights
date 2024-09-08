const express = require('express') ;

const {serverConfig } = require('./config') ;
const apiRoutes = require('./routes') ;

const app = express () ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.use('/api' , apiRoutes) ;

app.listen(serverConfig.PORT , ()=>{
    console.log(`server is succesfully started at server ${serverConfig.PORT}`) ; // sinc port in now ser-config.js file and we are importing 
                                                                                  // serverConfig from index.js of config folder so tha's why 
                                                                                  // using the serverConfig.PORT
})