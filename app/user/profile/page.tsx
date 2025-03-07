import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ProfileForm } from "./components/profile-form";

export const metadata = {
  title: "Customer Profile",
};

export default async function UserProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="h2-bold">Profile</h2>
        <ProfileForm />
      </div>
    </SessionProvider>
  );
}
