import {
  and,
  collection,
  getAggregateFromServer,
  query,
  sum,
  where,
} from "firebase/firestore";
import { db } from "../index";

const getStakePoolData = async ({ walletId, duration }) => {
  const stakesDocumentRef = collection(db, "stakes");

  const userStakeQuery = query(
    stakesDocumentRef,
    and(
      where("durationInMonths", "==", duration),
      where("walletId", "==", walletId)
    )
  );

  const globalStakeQuery = query(
    stakesDocumentRef,
    where("durationInMonths", "==", duration)
  );

  const userStakedAmountSnapshot = await getAggregateFromServer(
    userStakeQuery,
    { totalStakedAmount: sum("stakedAmount") }
  );

  const globalStakedAmountSnapshot = await getAggregateFromServer(
    globalStakeQuery,
    { totalStakedAmount: sum("stakedAmount") }
  );

  return {
    userStakeAmount: userStakedAmountSnapshot.data().totalStakedAmount,
    globalStakeAmount: globalStakedAmountSnapshot.data().totalStakedAmount,
  };
};

export default getStakePoolData;
