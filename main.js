//How promise works in javascript

let p = new Promise( (resolve,reject) => {

    let result=5+30

    if (result>33){

        resolve({"name": "Mostain", "marks": result})

    }else{
        reject("Fail, better luck next time!")
    }

})

let users = fetch('https://jsonplaceholder.typicode.com/users').then( res => res.json() );

users.then(usrs => {
    
    // for (var i=0; i<usrs.length; i++){
    //     console.log(usrs[i].id+'-'+usrs[i].name);
    // }
    usrs.forEach(element => {
        console.log(element.id+'-'+element.phone);
    });

} ).catch(err=> console.log(err));

const response = await fetch('https://jsonplaceholder.typicode.com/users');
if (response.ok){
    let response = await response.json()
}

// p.then( msg => console.log(msg)).catch( err => console.log(err))

//single promise catch
// p.then( (message) => {

//     console.log(message);

// }).catch( (err) => {

//     console.log('ERR: '+err);

// });

//multi promise catch
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
// Promise.allSettled([users,p]).then( values => 
//     {
//      console.log(values)
//     }
//  ).catch( errs => console.log(errs) );