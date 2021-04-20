import firebase from "firebase-admin";

export const useFirestore = (): FirebaseFirestore.Firestore => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp({ projectId: "cable-scheduler" });
  }
  return firebase.firestore();
};
