function compareTime(timeString1 , timeString2){ // departure , arrival
    let d1 = new Date(timeString1) ;
    let d2 = new Date(timeString2) ;

    let miliseconds1 = d1.getTime() ;
    let miliseconds2 = d2.getTime() ;
    return miliseconds2 > miliseconds1 ;  // returning true if arrivel time is grater than the departure time ....logical hai
}

module.exports = {
    compareTime 
}