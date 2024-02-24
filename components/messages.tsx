"use client";
import { Chat, Message as MessageType, User } from "@/types";
import Message from "./message";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Button, Textarea } from "@nextui-org/react";
import * as actions from "@/actions";
import { Session } from "next-auth";

const Messages = ({
  chat,
  friend,
  session,
}: {
  chat: Chat;
  friend: User;
  session: Session;
}) => {
  const [messages, setMessages] = useState(chat.messages);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<any>(null);
  const messagesContainer = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        _id: Math.random().toString(),
        text: message,
        sender: session.user.id,
        date: new Date(),
      },
    ]);
    socket.emit("send_msg", {
      text: message,
      sender: session.user.id,
      date: new Date(),
      roomId: chat._id.toString(),
    });
    actions.sendMessage(chat._id.toString(), session.user.id, message);
  };

  useEffect(() => {
    const socket = io(`https://chat-application-server-i5mv.onrender.com`);
    setSocket(socket);

    socket.emit("join_room", chat._id.toString());

    socket.on("receive_msg", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="h-full pt-2 overflow-y-scroll" ref={messagesContainer}>
        {messages.map((message: MessageType, index) => {
          return (
            <Message
              key={index}
              text={message.text}
              userImage={
                message.sender.toString() === friend._id
                  ? friend.image
                  : session.user.image
              }
              date={message.date}
              sender={
                message.sender.toString() === friend._id ? "friend" : "me"
              }
            />
          );
        })}
      </div>
      <form
        className="flex items-end gap-4 pt-4 border-t-1"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
          setMessage("");
        }}
      >
        <Textarea
          name="message"
          variant="bordered"
          className="max-w-xl"
          required
          placeholder={`Message ${friend.username}`}
          value={message}
          onValueChange={setMessage}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default Messages;
