
'use client';
import { initializeFirebase, FirebaseProvider } from '.';
import { ReactNode } from 'react';

const { firebaseApp, auth, firestore } = initializeFirebase();
export function FirebaseClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
