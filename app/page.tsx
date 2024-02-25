// import { authOptions } from "@/authOptions";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default async function Home() {
  console.log("Hello");
  // const session = await getServerSession(authOptions);
  // console.log(session);
  // if (session?.user) {
  //   redirect("/dashboard");
  // } else {
  //   redirect("/login");
  // }

  return <div>hello</div>;
}
