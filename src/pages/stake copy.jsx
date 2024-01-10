// import { fromEnv } from '@aws-sdk/credential-providers';
const {
  BrowserWallet,
  Transaction,
  resolvePaymentKeyHash,
  KoiosProvider,
  AppWallet,
} = require("@meshsdk/core");
const {
  KMSClient,
  EncryptCommand,
  DecryptCommand,
  EncryptionAlgorithmSpec,
} = require("@aws-sdk/client-kms");
// const { KoiosNetworkInfosEndpoionts } = require("@harmoniclabs/koios-pluts");
const {
  REACT_APP_AWS_ACCESS_KEY_ID,
  REACT_APP_AWS_SECRET_ACCESS_KEY,
  REACT_APP_KeyId,
  REACT_APP_KoiosApiToken,
} = require("../config");

async function Deposit(w) {
  //  tx
  let userAddress = await w.getUsedAddress();
  let userAddressStr = userAddress.to_bech32("addr").toString();
  // let contractAddress = scriptAddr.toString();
  let contractAddress = "";
  const userWalletKeyhash = resolvePaymentKeyHash(userAddressStr);
  let tadaUnit =
    "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441";

  // To-do: move the api key used in fetching utxo's to .env file

  const blockchainProvider = new KoiosProvider("api", "YOUR_API_KEY_GOES_HERE");
  const assetHex = "54414441";
  const policyId = "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb";
  const utxos = await blockchainProvider.fetchAddressUTxOs(
    contractAddress,
    policyId + assetHex
  );
  const tx = new Transaction({ initiator: w });
  await tx.sendAssets(contractAddress, [
    {
      quantity: "1", // the quantity of tada token, i.e. takes input from front end
      unit: "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb54414441",
    },
  ]);

  const unsignedTx = await tx.build();
  const signedTx = await w.signTx(unsignedTx);
  const txHash = await w.submitTx(signedTx);
  console.log("txHash", txHash);
}

exports.Deposit6 = async function (name) {
  let w = await BrowserWallet.enable(name);

  // To-do: store users info used in depositing, to be used when withdrawing

  Deposit(w);
};

exports.Deposit12 = async function (name) {
  let w = await BrowserWallet.enable(name);

  // To-do: store users info used in depositing, to be used when withdrawing

  Deposit(w);
};
exports.Deposit18 = async function (name) {
  let w = await BrowserWallet.enable(name);

  // To-do: store users info used in depositing, to be used when withdrawing

  Deposit(w);
};

exports.Withdraw = async function (name) {
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
    // ada address
    const address = wallet.getPaymentAddress();
    // user deposit ada for gas
    let browserWallet = await BrowserWallet.enable(name);
    const sendAda4gasTx = new Transaction({ initiator: browserWallet });
    await sendAda4gasTx.sendLovelace(address, "1200000");
    const unsignedsendAda4gasTx = await sendAda4gasTx.build();
    const signedsendAda4gasTx = await browserWallet.signTx(
      unsignedsendAda4gasTx
    );
    const sendAda4gasTxHash = await browserWallet.submitTx(signedsendAda4gasTx);
    if (sendAda4gasTxHash) {
      // withdrawal logic
      const assetHex = "54414441";
      const policyId =
        "9eaed3f99f5c9da1695acaf2542cd6b9f3ef18bbf94dd3f77d17f9cb";
      let amount2Send = "1";
      const withdrawalTx = new Transaction({ initiator: wallet });
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
    }
  } else {
    console.error("CiphertextBlob is either undefined or not a Uint8Array");
  }
};
