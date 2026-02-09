// Hooks
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase Auth
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Firestore
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// Utils
import { auth, db, googleProvider } from "../lib/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // redirect quando auth + profile estiverem prontos
  useEffect(() => {
    if (user && profile) {
      navigate("/home");
    }
  }, [user, profile]);

  // listener principal de auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      const is_google_user = firebaseUser.providerData.some(
        (p) => p.providerId === "google.com",
      );

      // bloqueia SOMENTE email/senha não verificado
      if (!firebaseUser.emailVerified && !is_google_user) {
        setUser(firebaseUser);
        setProfile(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);

      setUser(firebaseUser);
      setProfile(snap.exists() ? snap.data() : null);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const logout = () => signOut(auth);

  const auth_with_google = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser = result.user;

    const userRef = doc(db, "users", firebaseUser.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const data = {
        email: firebaseUser.email,
        username: firebaseUser.displayName,
        avatar: firebaseUser.photoURL,
        notesCount: 0,
        favoritesCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await setDoc(userRef, data);
      setProfile(data);
    } else {
      await updateDoc(userRef, {
        avatar: firebaseUser.photoURL,
        email: firebaseUser.email,
        updatedAt: Date.now(),
      });

      setProfile({ ...snap.data(), avatar: firebaseUser.photoURL });
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
        avatar: null,
        notesCount: 0,
        favoritesCount: 0,
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
