import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../index";

const addStake = async ({
  walletId,
  currencyType,
  stakedAmount,
  apy,
  durationInMonths,
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
  });
};

export default addStake;
