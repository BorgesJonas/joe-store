import { getUserById } from "@/lib/actions/user.actions";
import { notFound } from "next/navigation";
import { UserForm } from "../components/user-form";

export const metadata = {
  title: "Update User",
};

export default async function AdminUserEditPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;
  const user = await getUserById(id);

  if (!user) return notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h2 className="h2-bold">Update User</h2>
      <UserForm user={user} />
    </div>
  );
}
