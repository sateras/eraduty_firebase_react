import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../utils/firebaseConfig";
import { AuthContext } from "./context";

export const AuthProvider = ({ children }) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <AuthContext.Provider value={{ firebaseApp, auth, firestore }}>
      {children}
    </AuthContext.Provider>
  );
};
