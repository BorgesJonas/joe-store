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
import { SignUpForm } from "./components/sign-up-form";

export const metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

interface SignUpPageProps {
  searchParams: Promise<{ callbackUrl: string }>;
}
export default async function SignUpPage(props: SignUpPageProps) {
  const session = await auth();
  const { callbackUrl } = await props.searchParams;

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto py-6">
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
          <CardTitle className="text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your information bellow to sign up
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
