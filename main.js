//How promise works in javascript

let p = new Promise( (resolve,reject) => {

    let result=5+6

    if (result>33){

        resolve({"name": "Mostain", "marks": result})

    }else{
        reject("Fail, better luck next time!")
    }

})

p.then( (message) => {

     console.log(message);

}).catch( (err) => {
 
     console.log('ERR: '+err);

});