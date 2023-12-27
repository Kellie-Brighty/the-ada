import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../index";

const addStake = async ({
  walletId,
  currencyType,
  stakedAmount,
  apy,
  durationInMonths,
  txReference,
}) => {
  const stakeId = v4();
  const stakeDocumentRef = doc(db, "stakes", stakeId);

  await setDoc(stakeDocumentRef, {
    walletId,
    currencyType,
    stakedAmount,
    apy,
    durationInMonths,
    stakedOn: new Date().toISOString(),
    txReference,
  }).then(() => {
    console.log("Data has been added");
    const data = {
      walletId,
      currencyType,
      stakedAmount,
      apy,
      durationInMonths,
      stakedOn: new Date().toISOString(),
      txReference,
    };
    console.log("Sent data:::", data);
  });
};

export default addStake;
