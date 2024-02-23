"use client";
import { Friendship } from "@/types";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { io } from "socket.io-client";
import * as actions from "@/actions";
import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";

const FriendRequests = ({
  initialFriendRequests,
  sessionUser,
}: {
  initialFriendRequests: Friendship[];
  sessionUser: { id: string; name: string };
}) => {
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [socket, setSocket] = useState<any>(null);

  const respondToFriendRequest = (
    sender: { _id: string | ObjectId; username: string },
    response: "accept" | "reject"
  ) => {
    actions.respondToFriendRequest(sender._id.toString(), response);

    setFriendRequests((prevFriendRequests) =>
      prevFriendRequests.filter(
        (request) => request.user1._id !== sender._id.toString()
      )
    );

    console.log(sessionUser);

    socket.emit("respond_to_friend_request", {
      user1: {
        _id: sender._id,
        username: sender.username,
      },
      user2: {
        _id: sessionUser.id,
        username: sessionUser.name,
      },
      status: response,
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      query: { sessionId: sessionUser.id },
    });
    setSocket(socket);

    socket.on("receive_friend_request", (friendRequest) => {
      console.log(friendRequest);
      setFriendRequests((prevFriendRequests) => [
        ...prevFriendRequests,
        friendRequest,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!friendRequests.length) {
    return <p>No friend requests yet...</p>;
  }

  return (
    <div>
      {friendRequests.map((request, index) => {
        console.log(request);
        return (
          <div key={index} className="flex items-center gap-4">
            <Image src="/add-friend.svg" alt="" width={25} height={25} />
            <span className="font-medium">{request.user1.username}</span>
            <div className="flex gap-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  respondToFriendRequest(request.user1, "accept");
                }}
              >
                <Button
                  isIconOnly
                  color="success"
                  radius="full"
                  variant="solid"
                  size="sm"
                  type="submit"
                >
                  <Image
                    src="/checkmark.svg"
                    alt="checkmark"
                    width={18}
                    height={18}
                  />
                </Button>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  respondToFriendRequest(request.user1, "reject");
                }}
              >
                <Button
                  isIconOnly
                  color="danger"
                  radius="full"
                  variant="solid"
                  size="sm"
                  type="submit"
                >
                  <Image src="/clear.svg" alt="clear" width={20} height={20} />
                </Button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendRequests;
