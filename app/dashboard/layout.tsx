import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
