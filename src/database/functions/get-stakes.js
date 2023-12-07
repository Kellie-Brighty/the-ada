import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../index";

const getStakes = async ({ walletId }) => {
  const stakesDocumentRef = collection(db, "stakes");

  const stakesQuery = query(
    stakesDocumentRef,
    where("walletId", "==", walletId)
  );

  return (await getDocs(stakesQuery)).docs;
};

export default getStakes;
