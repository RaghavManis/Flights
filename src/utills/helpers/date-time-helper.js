function compareTime(timeString1 , timeString2){ // departure , arrival
    let d1 = new Date(timeString1) ;
    let d2 = new Date(timeString2) ;

    let miliseconds1 = d1.getTime() ;
    let miliseconds2 = d2.getTime() ;
    console.log(miliseconds1 < miliseconds2) ;
    console.log(miliseconds1 > miliseconds2) ;
    // console.log('Milliseconds for Departure:', miliseconds1);
    // console.log('Milliseconds for Arrival:', miliseconds2);
    // console.log('Departure Time String:', timeString1);
    // console.log('Arrival Time String:', timeString2);

    return miliseconds2 > miliseconds1 ;  // returning true if arrivel time is grater than the departure time ....logically true hai
}

module.exports = {
    compareTime 
}