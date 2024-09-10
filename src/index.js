const express = require('express') ;

const {serverConfig } = require('./config') ;
const apiRoutes = require('./routes') ;

const app = express () ;

app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;

app.use('/api' , apiRoutes) ;

app.listen(serverConfig.PORT , async ()=>{
    console.log(`server is succesfully started at server ${serverConfig.PORT}`) ; // sinc port in now ser-config.js file and we are importing 
                                                                                 // serverConfig from index.js of config folder so tha's why 
                                                                                  // using the serverConfig.PORT


    // ......................................BAD CODE REQUEST...................................
    // const {City , Airport} = require('./models') ;
    // // console.log(typeof City ,typeof Airport) ;  // ---> type is function
    // const allahabd =  await City.findByPk(1 ) ;    // will select city from primary key
    // // console.log(allahabd) ;
    // // const airport = await  Airport.create({name:"lal bahadur sastri" , code:"VNS"}) ; // without cityId error will be came
    // // const airport = await  Airport.create({name:"lal bahadur sastri" , code:"VNS" , cityId :1}) ;  // a new entry of airport will be created in AIrport model with coty id of given id
    //  const kolkata = await City.findByPk(10) ;
    // //  console.log(kolkata) ;

    // // the below createAirport function is given by the sequelize(since we have link the table at js level also ) , we never created this functions manually
    // //  const airport = kolkata.createAirport({name:"huggli2" , code : "HUG2"}) ; // this will create a entry of airport with cityId of kolakata and details with which we have passed 

    // //  const airportsInKolkata = await kolkata.getAirports() ;  // again using the function provided by sequelize by getting all airport related with any specific city
    // //  console.log(airportsInKolkata) ;

    // //  lets try to remove any airport
    // const airportINallahabd = await Airport.findByPk(1) ;
    // console.log(airportINallahabd) ;
    // // await allahabd.removeAirport(airportINallahabd) ;
}) 