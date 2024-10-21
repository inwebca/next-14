"use client";
import { useAuth } from "@/app/context/AuthUserContext";
import { useRouter } from "next/navigation";

export default function ClientLogoutButton() {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOutUser();
    router.push("/sign-in"); // Redirect to sign-in page after logging out
  };

  if (!user) return null; // Return nothing if no user is logged in

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Log Out
      </button>
    </div>
  );
}
