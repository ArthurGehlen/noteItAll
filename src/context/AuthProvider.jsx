// Hooks
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Utils
import { auth, db, googleProvider } from "../lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      if (!firebaseUser.emailVerified) {
        setUser(firebaseUser);
        setProfile(null);
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      setUser(firebaseUser);
      setProfile(snap.exists() ? snap.data() : null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = () => signOut(auth);

  const auth_with_google = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          username: user.displayName, // não colocar username default :)
          email: user.email,
          avatar: user.photoURL,
          theme: "light", // tema padrão
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      if (snap.exists()) {
        await updateDoc(userRef, {
          username: user.displayName, // não colocar username default :)
          email: user.email,
          avatar: user.photoURL,
          theme: "light", // tema padrão
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signup_action = async (email, username, password, confirmPassword) => {
    if (!email || !username || !password || !confirmPassword) {
      return { ok: false, error: "Preencha tudo." };
    }

    if (password !== confirmPassword) {
      return { ok: false, error: "As senhas não coincidem." };
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        username,
        email,
        avatar: null, // só pega o avatar quando entra/cria conta com o google
        theme: "light",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      await sendEmailVerification(cred.user);

      return { ok: true, error: null };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const login_action = async (email, password) => {
    if (!email || !password) {
      return { ok: false, error: "Preencha tudo." };
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { ok: true, error: null };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        logout,
        signup_action,
        login_action,
        auth_with_google,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
