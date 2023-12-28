// const {
//   BrowserWallet,
//   Transaction,
//   resolvePaymentKeyHash,
//   KoiosProvider,
// } = require("@meshsdk/core");
import {
  BrowserWallet,
  Transaction,
  resolvePaymentKeyHash,
  KoiosProvider,
} from "@meshsdk/core";
// import { scriptAddr, contract } from "./logic/contract";
// const { scriptAddr, contract } = require("./logic/contract");
import addStake from "../database/functions/add-stake";
import { useNavigate } from "react-router-dom";

async function Deposit(w, quantity, stakeAddress, currencyType, duration) {
  let userAddress = await w.getUsedAddress();
  let userAddressStr = userAddress.to_bech32("addr").toString();
  // console.log("user address:::", userAddressStr)
  let contractAddress =
    "addr1w85vjne65nh3zfp9ndf6xnk02uxkzlsdtczsu7pxw8gatuqe9vpg8";
  console.log("contract address:::", contractAddress);
  const userWalletKeyhash = resolvePaymentKeyHash(userAddressStr);
  let tadaUnit =
    "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441";
  // To-do: move the api key used in fetching utxo's to .env file
  const blockchainProvider = new KoiosProvider(
    "api",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTlseXFrYWQ0bDdsOG1lanZsY3I4bGwza21rdm1wamhkZGh2dGdmeGcwMjk0bmN4azdqcTciLCJleHAiOjE3MzQ5NzI1NTYsInRpZXIiOjEsInByb2pJRCI6InRoZWFkYXBybyJ9.rmVUtYYYaL18XaRP1OTecIg7I_dw4U75blG8avt2Wzs"
  );
  const assetHex = "54414441";
  const policyId = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb";
  const utxos = await blockchainProvider.fetchAddressUTxOs(
    contractAddress,
    policyId + assetHex
  );
  const tx = new Transaction({ initiator: w });

  await tx.sendAssets(contractAddress, [
    {
      quantity: quantity, // the quantity of tada token, i.e. takes input from front end
      unit: "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441",
    },
  ]);
  const unsignedTx = await tx.build();
  const signedTx = await w.signTx(unsignedTx);
  const txHash = await w.submitTx(signedTx);
  console.log("txHash", txHash);
  const monthAPYMap = {
    6: 45,
    12: 105,
    18: 160,
  };

  await addStake({
    walletId: stakeAddress,
    currencyType,
    stakedAmount: parseInt(quantity),
    apy: monthAPYMap[duration],
    durationInMonths: duration,
    txReference: txHash,
  }).then((res) => {
    window.location.href = "/history";
    console.log("response after add:::", res);
    console.log("txHash after add:::", txHash);
  });
}

export const Deposit6 = async (
  name,
  quantity,
  stakeAddress,
  currencyType,
  duration
) => {
  console.log("quantity:::", quantity);
  let w = await BrowserWallet.enable(name);
  // const navigate = useNavigate();

  // To-do: store users info used in depositing, to be used when withdrawing

  Deposit(w, quantity, stakeAddress, currencyType, duration);
};

export const Deposit12 = async (
  name,
  quantity,
  stakeAddress,
  currencyType,
  duration
) => {
  let w = await BrowserWallet.enable(name);

  // To-do: store users info used in depositing, to be used when withdrawing

  Deposit(w, quantity, stakeAddress, currencyType, duration);
};

export const Deposit18 = async (
  name,
  quantity,
  stakeAddress,
  currencyType,
  duration
) => {
  let w = await BrowserWallet.enable(name);

  // To-do: store users info used in depositing, to be used when withdrawing

  Deposit(w, quantity, stakeAddress, currencyType, duration);
};

// txBuilder = new TxBuilder("mainnet")

// export const Withdraw = async (name) => {
//   //  tx
//   let w = await BrowserWallet.enable(name);
//   let userAddress = await w.getUsedAddress();
//   let userAddressStr = userAddress.to_bech32("addr").toString();
//   let contractAddress = scriptAddr.toString();
//   const userWalletKeyhash = resolvePaymentKeyHash(userAddressStr);
//   let tadaUnit =
//     "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441";

//   // To-do: move the api key used in fetching utxo's to .env file

//   const blockchainProvider = new KoiosProvider(
//     "api",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTlseXFrYWQ0bDdsOG1lanZsY3I4bGwza21rdm1wamhkZGh2dGdmeGcwMjk0bmN4azdqcTciLCJleHAiOjE3MzQ5NzI1NTYsInRpZXIiOjEsInByb2pJRCI6InRoZWFkYXBybyJ9.rmVUtYYYaL18XaRP1OTecIg7I_dw4U75blG8avt2Wzs"
//   );
//   const assetHex = "54414441";
//   const policyId = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb";
//   const utxos = await blockchainProvider.fetchAddressUTxOs(
//     contractAddress,
//     policyId + assetHex
//   );
//   const tx = new Transaction({ initiator: w });

//   // withdraw function with error
//   await tx.redeemValue({ value: utxos[0], script: contract, datum: utxos[0] });

//   const unsignedTx = await tx.build();
//   const signedTx = await w.signTx(unsignedTx);
//   const txHash = await w.submitTx(signedTx);

//   console.log("txHash", txHash);
// };

export const getBalance = async function (name) {
  const w = await BrowserWallet.enable(name);
  //  tx
  let userAddress = await w.getUsedAddress();
  let userAddressStr = userAddress.to_bech32("addr").toString();
  // To-do: move the api key used in fetching utxo's to .env file

  const blockchainProvider = new KoiosProvider(
    "api",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyIjoic3Rha2UxdTlseXFrYWQ0bDdsOG1lanZsY3I4bGwza21rdm1wamhkZGh2dGdmeGcwMjk0bmN4azdqcTciLCJleHAiOjE3MzQ5NzI1NTYsInRpZXIiOjEsInByb2pJRCI6InRoZWFkYXBybyJ9.rmVUtYYYaL18XaRP1OTecIg7I_dw4U75blG8avt2Wzs"
  );
  const assetHex = "54414441";
  const policyId = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb";

  const userUtxos = await blockchainProvider.fetchAddressUTxOs(
    userAddressStr,
    policyId + assetHex
  );

  let tBalance = 0;
  for (var i = 0; i < userUtxos.length; i++) {
    tBalance += parseInt(userUtxos[i].output.amount[1].quantity);
  }
  console.log("tada balance:::", tBalance);
  return tBalance;
};
