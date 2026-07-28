"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import type { AgeTier, UserProfile } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  configured: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  completeOnboarding: (ageTier: AgeTier, country?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  try {
    setUser(firebaseUser);

    if (firebaseUser && db) {
      const ref = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      } else {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          ageTier: null,
          createdAt: new Date().toISOString(),
          onboardingComplete: false,
        };

        await setDoc(ref, newProfile);
        setProfile(newProfile);
      }
    } else {
      setProfile(null);
    }
  } catch (error) {
    console.error("Auth error:", error);
    setProfile(null);
  } finally {
    setLoading(false);
  }
});
    return () => unsubscribe();
  }, []);

  async function signUp(email: string, password: string, name: string) {
    if (!auth) throw new Error("Firebase is not configured.");
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
  }

  async function logIn(email: string, password: string) {
    if (!auth) throw new Error("Firebase is not configured.");
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logInWithGoogle() {
    if (!auth) throw new Error("Firebase is not configured.");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async function resetPassword(email: string) {
    if (!auth) throw new Error("Firebase is not configured.");
    await sendPasswordResetEmail(auth, email);
  }

  async function logOut() {
    if (!auth) return;
    await firebaseSignOut(auth);
  }

  async function completeOnboarding(ageTier: AgeTier, country?: string) {
    if (!user || !db) throw new Error("Not signed in.");
    const ref = doc(db, "users", user.uid);
    const updated: Partial<UserProfile> = {
  ageTier,
  onboardingComplete: true,
};

if (country) {
  updated.country = country;
}
    await setDoc(ref, { ...updated, updatedAt: serverTimestamp() }, { merge: true });
    setProfile((prev) => (prev ? { ...prev, ...updated } : prev));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        configured: isFirebaseConfigured,
        signUp,
        logIn,
        logInWithGoogle,
        resetPassword,
        logOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
