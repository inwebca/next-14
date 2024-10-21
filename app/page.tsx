import { db } from "@/app/config/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { User } from "@/app/types/User";

async function fetchUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as User[];
}

export default async function Home() {
  const users = await fetchUsers();
  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
