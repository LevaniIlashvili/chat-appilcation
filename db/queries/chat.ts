import { Chat } from "@/models/chat";

export const fetchChat = (users: string[]) => {
  return Chat.findOne({ users: { $all: [...users] } }).populate("users");
};
