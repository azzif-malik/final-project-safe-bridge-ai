import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JournalEntry, Mood } from "@/lib/types";

export function subscribeToJournal(
  uid: string,
  callback: (entries: JournalEntry[]) => void
) {
  if (!db) return () => {};
  const q = query(
    collection(db, "journalEntries"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    const entries = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as JournalEntry);
    callback(entries);
  });
}

export async function createJournalEntry(
  uid: string,
  title: string,
  content: string,
  mood: Mood
) {
  if (!db) throw new Error("Firestore is not configured.");
  const now = new Date().toISOString();
  await addDoc(collection(db, "journalEntries"), {
    uid,
    title,
    content,
    mood,
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateJournalEntry(
  id: string,
  fields: Partial<Pick<JournalEntry, "title" | "content" | "mood" | "aiSummary">>
) {
  if (!db) throw new Error("Firestore is not configured.");
  await updateDoc(doc(db, "journalEntries", id), {
    ...fields,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteJournalEntry(id: string) {
  if (!db) throw new Error("Firestore is not configured.");
  await deleteDoc(doc(db, "journalEntries", id));
}
