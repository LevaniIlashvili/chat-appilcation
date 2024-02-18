"use client";
import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const session = useSession();

  if (session.data) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center h-screen">
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
    </div>
  );
};

export default LoginPage;