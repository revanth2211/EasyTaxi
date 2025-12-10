import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const addBooking = async ({ pickup, dropoff, vehicle, phone }) => {
  await addDoc(collection(db, "bookings"), {
    pickup,
    dropoff,
    vehicle,
    phone,
    status: "confirmed",
    createdAt: Timestamp.now()
  });
};

export const getBookingsByPhone = async (phone) => {
  const colRef = collection(db, "bookings");
  const q = query(colRef, where("phone", "==", phone));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
