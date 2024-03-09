"use client";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = () => {
  console.log("getting session in login page");
  const session = useSession();

  console.log("session in login page", session);

  if (session.data) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col gap-10 justify-center items-center h-screen">
      <Image
        src="./message-logo.svg"
        alt="message-logo"
        width={100}
        height={100}
      />
      <div className="flex gap-2">
        <Button
          onClick={() => signIn("google")}
          size="lg"
          color="success"
          variant="bordered"
        >
          Sign Up
        </Button>
        <Button onClick={() => signIn("google")} size="lg" color="success">
          Sign In
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
