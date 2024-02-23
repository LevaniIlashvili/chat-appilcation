import { fetchFriendRequests } from "@/db/queries/friendship";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import FriendRequests from "@/components/friend-requests";
import { Friendship } from "@/types";

const FriendRequestsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const friendRequests = (await fetchFriendRequests(
    session.user.id
  )) as Friendship[];

  const serializedFriendRequests = JSON.parse(JSON.stringify(friendRequests));

  return (
    <main className="pt-32 pl-14">
      <h1 className="text-5xl font-bold mb-6">Add a Friend</h1>
      <FriendRequests
        initialFriendRequests={serializedFriendRequests}
        sessionUser={session.user}
      />
    </main>
  );
};

export default FriendRequestsPage;
