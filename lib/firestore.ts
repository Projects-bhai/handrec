import {
  collection,
  doc,
  getDoc as firestoreGetDoc,
  getDocs as firestoreGetDocs,
  setDoc,
  updateDoc,
  deleteDoc as firestoreDeleteDoc,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export async function getDocument<T>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await firestoreGetDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getCollection<T>(
  collectionName: string,
  orderField: string = "order"
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), orderBy(orderField, "asc"));
    const querySnapshot = await firestoreGetDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as T
    );
  } catch {
    try {
      const querySnapshot = await firestoreGetDocs(
        collection(db, collectionName)
      );
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as T
      );
    } catch {
      return [];
    }
  }
}

export async function setDocument(
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<boolean> {
  try {
    await setDoc(doc(db, collectionName, docId), data, { merge: true });
    return true;
  } catch {
    return false;
  }
}

export async function updateDocument(
  collectionName: string,
  docId: string,
  data: DocumentData
): Promise<boolean> {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
    return true;
  } catch {
    return false;
  }
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<boolean> {
  try {
    await firestoreDeleteDoc(doc(db, collectionName, docId));
    return true;
  } catch {
    return false;
  }
}

export async function uploadFile(
  file: File,
  path: string
): Promise<string | null> {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch {
    return null;
  }
}
