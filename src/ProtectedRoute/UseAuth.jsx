import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {
  clearUserData,
  selectUserData,
  setUserData,
  setPhoneUser,
} from "../redux/slice";
import { doc, onSnapshot } from "firebase/firestore";
const UseAuth = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        setLoggedIn(true);
        dispatch(setPhoneUser(user));

        const unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            dispatch(setUserData(doc.data()));
          } else {
            console.log("User document does not exist");
          }
        });

        return () => unsubscribeFirestore();
      } else {
        dispatch(clearUserData());
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { loggedIn, loading, userData };
};

export default UseAuth;
