/* Moralis init code */
const serverUrl = "https://ynriprd0e4nd.usemoralis.com:2053/server";
const appId = "vOQwWdGZJbTlt9m9VFMijeSnTvZWTeLuS8a2T6Dd";

Moralis.start({ serverUrl, appId });

//Moralis.Plugins.fiat.buy();

/* Authentication code */
async function login() {
  let user = Moralis.User.current();

  if (!user) {

    // user = await Moralis.authenticate({ signingMessage: "Log in using TaxToken" })
    //   .then(function (user) {
    //     console.log("logged in user:", user);
    //     console.log(user.get("ethAddress"));
    //   })
    //   .catch(function (error) {
    //     console(error);
    //   });

    user = await Moralis.Web3.authenticate();

  }
  // get stats on page load
  console.log("logged in user:",user.get("ethAddress"));
  getStats();
  getClient();

}

async function logOut() {
  let user = Moralis.User.current();
  await Moralis.User.logOut();
  console.log(user," logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

document.getElementById("btn-get-stats").onclick = getStats;

document.getElementById("btn-add").onclick = addClient;

document.getElementById("btn-buy").onclick = buyCrypto;

function getStats() {
  const user = Moralis.User.current();
  if (user) {
    getUserTransactions(user);
  }
  getAverageGasPrices();
}

async function getUserTransactions(user) {
  // create query
  const query = new Moralis.Query("EthTransactions");
  query.equalTo("from_address", user.get("ethAddress"));

  const subscription = await query.subscribe();
  newTrxHandler(subscription);

  // run query
  const results = await query.find();
  console.log("user transactions:", results);
}

async function newTrxHandler(subscription){

    subscription.on("create", function(data){

         console.log("New trx:",data)

    });

}

async function getAverageGasPrices() {
    const results = await Moralis.Cloud.run("getAvgGas");
    console.log("average user gas prices:", results);

    renderGasStats(results);
}

function renderGasStats(data) {
    const container = document.getElementById("gas-stats");
    container.innerHTML = data
      .map(function (row, rank) {
        return `<li>#${rank + 1}: ${Math.round(row.avgGas)} gwei</li>`;
      })
      .join("");

      if (data.length==0){
        container.innerHTML=`<li> No record found. </li>`;
      }
  }

  async function getClient(){

   const cln = new Moralis.Query("Client");
   const results = await cln.find();

   for (var i=0; i<results.length; i++){
       const obj=results[i];
       console.log(obj.id, "#", obj.get("name"),"-",obj.get("age"),"*", obj.createdAt);
   }

  }

  async function addClient(){

    const Client = Moralis.Object.extend("Client");
    const client = new Client();

    client.set("name", "Ariel Ferdman");
    client.set("age", 37);
    client.set("subscribed", true);

    try{

        const cln = await client.save();
        console.log("client id#",cln);
        console.log(cln.get("className"), cln.id,cln.className,"added");

    }catch(err){
        console.log("ERR",err);
    }

    // Client.save()
    // .then((Client) => {
    //     // Execute any logic that should take place after the object is saved.
    //     alert('New object created with objectId: ' + Client.id);
    // }, (error) => {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Moralis.Error with an error code and message.
    //     alert('Failed to create new object, with error code: ' + error.message);
    // });

  }


 (async function(){
   Moralis.initPlugins();
 })();
 
 function buyCrypto(){
  console.log('buy crypto');
  Moralis.Plugins.fiat.buy();
 }