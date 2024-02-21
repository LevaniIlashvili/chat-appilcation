import { authOptions } from "@/authOptions";
import { fetchChat } from "@/db/queries/chat";
import type { User } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Messages from "@/components/messages";

const ChatPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const chat = await fetchChat([params.id, session.user.id]);

  const friend = chat.users.find(
    (user: User) => user._id.toString() !== session.user.id
  );

  const serializedChat = JSON.parse(JSON.stringify(chat));
  const serializedFriend = JSON.parse(JSON.stringify(friend));

  return (
    <div className="w-full flex flex-col py-10">
      <div className="flex gap-4 pb-4 border-b-1">
        <Image
          src={friend.image}
          alt="user image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium text-lg">{friend.username}</span>
          <span className="text-sm text-gray-700">{friend.email}</span>
        </div>
      </div>
      <Messages
        chat={serializedChat}
        friend={serializedFriend}
        session={session}
      />
    </div>
  );
};

export default ChatPage;
