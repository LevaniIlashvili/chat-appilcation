"use client";
import { Friendship } from "@/types";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SidebarChats = ({
  initialFriendships,
  sessionUserId,
}: {
  initialFriendships: Friendship[];
  sessionUserId: string;
}) => {
  const [friendships, setFriendships] = useState(initialFriendships);

  useEffect(() => {
    const socket = io(`https://chat-application-server-i5mv.onrender.com`, {
      query: { sessionId: sessionUserId },
    });

    socket.on("receive_response_to_friend_request", (response) => {
      console.log(response);
      setFriendships((prevFriendships) => [...prevFriendships, response]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {friendships.length ? (
        <div className="mb-4 font-medium">
          <p className="text-sm font-medium text-gray-400 mb-4">Your Chats</p>
          <ul>
            {friendships.map((friendship, index) => {
              console.log(friendship);
              const friend =
                friendship.user1._id.toString() === sessionUserId
                  ? friendship.user2
                  : friendship.user1;
              return (
                <li key={index}>
                  <Button
                    as={Link}
                    href={`/dashboard/chat/${friend._id.toString()}`}
                    variant="light"
                    className="text-md font-medium"
                  >
                    {friend.username}
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SidebarChats;
