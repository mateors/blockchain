/* Moralis init code */
const serverUrl = "https://ynriprd0e4nd.usemoralis.com:2053/server";
const appId = "vOQwWdGZJbTlt9m9VFMijeSnTvZWTeLuS8a2T6Dd";

Moralis.start({ serverUrl, appId });

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

}

async function logOut() {
  let user = Moralis.User.current();
  await Moralis.User.logOut();
  console.log(user," logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

document.getElementById("btn-get-stats").onclick = getStats;

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
    const results = await Moralis.Cloud.run("getAvgGass");
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