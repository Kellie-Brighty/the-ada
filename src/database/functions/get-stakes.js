import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../index";

const getStakes = async ({ walletId, lastDocument }) => {
  const stakesDocumentRef = collection(db, "stakes");

  if (lastDocument) {
    var stakesQuery = query(
      stakesDocumentRef,
      where("walletId", "==", walletId),
      orderBy("stakedOn"),
      startAfter(lastDocument),
      limit(10)
    );
  } else {
    var stakesQuery = query(
      stakesDocumentRef,
      where("walletId", "==", walletId),
      orderBy("stakedOn", "desc"),
      startAt(0),
      limit(10)
    );
  }

  return (await getDocs(stakesQuery)).docs;
};

export default getStakes;
