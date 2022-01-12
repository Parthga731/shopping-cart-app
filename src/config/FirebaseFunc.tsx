import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signUpType } from "../other/AllTypes";
import { auth, database } from "./Firebase.config";

export const SignInUser = async (values: signUpType) => {
  const { email, password } = values;

  let res = await signInWithEmailAndPassword(auth, email, String(password));
  return res;
};

export const getSingleData = async (user: any) => {
  const docRef = await doc(database, "SignedUpUsersData", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const getProductsData = async () => {
  const alldata = await getDocs(collection(database, "Products"));
  if (alldata) {
    let setAlldata = alldata.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log(setAlldata);
    return setAlldata;
  }
};
