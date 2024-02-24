import { authOptions } from "@/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
