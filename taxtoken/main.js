/* Moralis init code */
const serverUrl = "https://ynriprd0e4nd.usemoralis.com:2053/server";
const appId = "vOQwWdGZJbTlt9m9VFMijeSnTvZWTeLuS8a2T6Dd";

Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
      })
      .catch(function (error) {
        console(error);
      });
  }
}

async function logOut() {
  let user = Moralis.User.current();
  await Moralis.User.logOut();
  console.log(user," logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;