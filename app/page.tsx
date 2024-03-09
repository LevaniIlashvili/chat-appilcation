import { authOptions } from "@/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    console.log("getting session");
    const session = await getServerSession(authOptions);

    console.log("session", session);

    if (session?.user) {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  } catch (error) {
    console.error("error", error);
  }
}
