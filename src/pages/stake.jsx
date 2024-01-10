import {
  BrowserWallet,
  Transaction,
  resolvePaymentKeyHash,
  KoiosProvider,
  AppWallet,
} from "@meshsdk/core";
import {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
  EncryptionAlgorithmSpec,
} from "@aws-sdk/client-kms";
// import { KoiosNetworkInfosEndpoionts } from "@harmoniclabs/koios-pluts";
import {
  REACT_APP_AWS_ACCESS_KEY_ID,
  REACT_APP_AWS_SECRET_ACCESS_KEY,
  REACT_APP_KeyId,
  REACT_APP_KoiosApiToken,
} from "../config";

// import { scriptAddr, contract } from "./logic/contract";
// const { scriptAddr, contract } = require("./logic/contract");
import addStake from "../database/functions/add-stake";

async function Deposit(w, quantity, stakeAddress, currencyType, duration) {
  let userAddress = await w.getUsedAddress();
  let userAddressStr = userAddress.to_bech32("addr").toString();
  // console.log("user address:::", userAddressStr)
  let contractAddress =
    "addr1v9wp694r0kd3x4s36q7feykgqr0ey4hhkm6lpe2ctndfnsssjspp4";
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

  // user deposit ada for gas

  // const sendAda4gasTx = new Transaction({ initiator: w });
  // await sendAda4gasTx.sendLovelace(contractAddress, "1500000").sendAssets;
  // const unsignedsendAda4gasTx = await sendAda4gasTx.build();
  // const signedsendAda4gasTx = await w.signTx(unsignedsendAda4gasTx);
  // const sendAda4gasTxHash = await w.submitTx(signedsendAda4gasTx);
  // console.log(sendAda4gasTx);
  // if (!sendAda4gasTxHash) {
  //   console.log("You need to deposit Ada for gas");
  // } else {
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
// }

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

export const Withdraw = async (name, amountToWithdraw) => {
  let accesskeyID = "";
  let accessSecretKey = "";

  if (REACT_APP_AWS_ACCESS_KEY_ID) {
    accesskeyID = REACT_APP_AWS_ACCESS_KEY_ID;
  }
  if (REACT_APP_AWS_SECRET_ACCESS_KEY) {
    accessSecretKey = REACT_APP_AWS_SECRET_ACCESS_KEY;
  }

  const client = new KMSClient({
    region: "eu-north-1",
    credentials: {
      accessKeyId: accesskeyID,
      secretAccessKey: accessSecretKey,
    },
  });

  const params = require("./theAdaParms.json");
  const numberToUint8 = new Uint8Array(params.values);
  const decryptCommand = new DecryptCommand({
    CiphertextBlob: numberToUint8, // <----- value would be read here and used here
    EncryptionContext: params.EncryptionContext,
    KeyId: REACT_APP_KeyId,
    EncryptionAlgorithm: EncryptionAlgorithmSpec.SYMMETRIC_DEFAULT,
    DryRun: false,
  });

  const response = await client.send(decryptCommand);
  if (response.Plaintext instanceof Uint8Array) {
    const buffer = Buffer.from(response.Plaintext);
    const text = buffer.toString("utf-8"); // Assuming UTF-8 encoding, adjust if needed
    let kApiToken = "";
    if (REACT_APP_KoiosApiToken) kApiToken = REACT_APP_KoiosApiToken;
    const blockchainProvider = new KoiosProvider("api", kApiToken);
    // ada wallet instance
    const wallet = new AppWallet({
      networkId: 1,
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: "mnemonic",
        words: text.split(" "),
      },
    });

    let amount2Send = amountToWithdraw;
    const withdrawalTx = new Transaction({ initiator: wallet });
    let browserWallet = await BrowserWallet.enable(name);
    let userAddress = await browserWallet.getUsedAddress();
    let userAddressStr = userAddress.to_bech32("addr").toString();
    await withdrawalTx.sendAssets(userAddressStr, [
      {
        quantity: amount2Send, // the quantity of tada token, i.e. takes input from front end
        unit: "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441",
      },
    ]);
    const unsignedTx = await withdrawalTx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash", txHash);
  } else {
    console.error("CiphertextBlob is either undefined or not a Uint8Array");
  }
};

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
