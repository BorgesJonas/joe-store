import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { APP_NAME } from "@/lib/consts";
import { CredentialsForm } from "./components/credentials-form";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

interface SignInPageProps {
  searchParams: Promise<{ callbackUrl: string }>;
}
export default async function SignInPage(props: SignInPageProps) {
  const session = await auth();
  const { callbackUrl } = await props.searchParams;

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
            />
          </Link>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign In to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsForm />
        </CardContent>
      </Card>
    </div>
  );
}
