import { Suspense } from "react";
import ClientLogoutButton from "@/app/components/ClientLogoutButton";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value;

  // If no token, redirect to /sign-in
  if (!token) {
    redirect("/sign-in");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>Welcome to the Home Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ClientLogoutButton />
      </Suspense>
    </div>
  );
}
