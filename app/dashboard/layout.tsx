import { authOptions } from "@/authOptions";
import { fetchFriendships } from "@/db/queries/friendship";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  // if (!session) redirect("/login");

  const friendships = await fetchFriendships(session.user.id);

  return (
    <main className="w-full h-screen flex">
      <aside className="w-80 border py-4  px-6">
        <Link href="/dashboard">
          <Image
            src="/message-logo.svg"
            alt="message logo"
            width={50}
            height={50}
            className="mb-10"
          />
        </Link>
        {friendships.length ? (
          <div className="mb-4 font-medium">
            <p className="text-sm font-medium text-gray-400 mb-4">Your Chats</p>
            <ul>
              {friendships.map((friendship) => {
                return (
                  <li key={friendship.id}>
                    <Button variant="light" className="text-md font-medium">
                      {friendship.user1.id === session.user.id
                        ? friendship.user2.username
                        : friendship.user1.username}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-gray-400">overview</p>
          <Button
            as={Link}
            href="/dashboard/add"
            className="w-44 justify-start font-medium"
            variant="light"
            startContent={
              <Image src="/user.svg" alt="user icon" width={20} height={20} />
            }
            type="button"
          >
            Add Friend
          </Button>
          <Button
            as={Link}
            href="/dashboard/requests"
            className="w-44 justify-start font-medium"
            variant="light"
            startContent={
              <Image
                src="/add-friend.svg"
                alt="user with plus, icon"
                width={20}
                height={20}
              />
            }
            type="button"
          >
            Friend Requests
          </Button>
        </div>
      </aside>
      {children}
    </main>
  );
};

export default Layout;
