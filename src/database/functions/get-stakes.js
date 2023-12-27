import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../index";

const getStakes = async ({ walletId, pageNumber }) => {
  const stakesDocumentRef = collection(db, "stakes");

  const stakesQuery = query(
    stakesDocumentRef,
    where("walletId", "==", walletId),
    orderBy("stakedOn"),
    startAfter(pageNumber * 10),
    limit(10)
  );

  return (await getDocs(stakesQuery)).docs;
};

export default getStakes;
