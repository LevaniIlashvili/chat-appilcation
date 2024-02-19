import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { fetchFriendRequests } from "@/db/queries/friendship";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

const FriendRequestsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const friendRequests = await fetchFriendRequests(session.user.id);

  return (
    <main className="pt-32 pl-14">
      <h1 className="text-5xl font-bold mb-6">Add a Friend</h1>
      {friendRequests.map((request) => {
        return (
          <div key={request.id} className="flex items-center gap-4">
            <Image src="/add-friend.svg" alt="" width={25} height={25} />
            <span className="font-medium">{request.user1.username}</span>
            <div className="flex gap-2">
              <Button
                isIconOnly
                color="success"
                radius="full"
                variant="solid"
                size="sm"
              >
                <Image
                  src="/checkmark.svg"
                  alt="checkmark"
                  width={18}
                  height={18}
                />
              </Button>
              <Button
                isIconOnly
                color="danger"
                radius="full"
                variant="solid"
                size="sm"
              >
                <Image src="/clear.svg" alt="clear" width={20} height={20} />
              </Button>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default FriendRequestsPage;