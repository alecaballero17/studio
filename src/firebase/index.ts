
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { useUser } from './auth/use-user';
import {
  FirebaseProvider,
  useFirebase,
  useFirebaseApp,
  useAuth,
  useFirestore,
} from './provider';
import { FirebaseClientProvider } from './client-provider';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

const firebaseConfig = {
  "projectId": "studio-710330583-5f875",
  "appId": "1:148515133479:web:fdbd1197d18f6e7c965602",
  "apiKey": "AIzaSyA3gWB1efdmpSylqkJ4MDeCf9I9uLuNbuo",
  "authDomain": "studio-710330583-5f875.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "148515133479"
};


let app, auth, firestore;

function initializeFirebase() {
  const apps = getApps();
  if (apps.length > 0) {
    app = apps[0];
  } else {
    app = initializeApp(firebaseConfig);
  }
  auth = getAuth(app);
  firestore = getFirestore(app);
  return { firebaseApp: app, auth, firestore };
}

export {
  initializeFirebase,
  FirebaseProvider,
  FirebaseClientProvider,
  useUser,
  useFirebase,
  useFirebaseApp,
  useAuth,
  useFirestore,
  useCollection,
  useDoc,
};
