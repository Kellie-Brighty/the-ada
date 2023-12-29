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
      limit(5)
    );
  } else {
    var stakesQuery = query(
      stakesDocumentRef,
      where("walletId", "==", walletId),
      orderBy("stakedOn"),
      startAt(0),
      limit(5)
    );
  }

  return (await getDocs(stakesQuery)).docs;
};

export default getStakes;
