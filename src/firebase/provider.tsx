
'use client';
import {
  Auth,
  getAuth,
} from 'firebase/auth';
import {
  FirebaseApp,
  getApp,
} from 'firebase/app';
import {
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useContext,
} from 'react';

export type FirebaseContextValue = {
  firebaseApp: FirebaseApp,
  auth: Auth,
  firestore: Firestore,
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined,
);

export type FirebaseProviderProps = {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

export function FirebaseProvider({
  children,
  firebaseApp,
  auth,
  firestore,
}: FirebaseProviderProps) {
  if (
    !firebaseApp ||
    !auth ||
    !firestore
  ) {
    return <>{children}</>;
  }

  const value = { firebaseApp, auth, firestore };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export function useFirebaseApp() {
  return useFirebase().firebaseApp;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useFirestore() {
  return useFirebase().firestore;
}
