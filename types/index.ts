import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId | string;
  username: string;
  email: string;
  image: string;
}

export interface Chat {
  _id: ObjectId | string;
  users: User[];
  messages: Message[];
}

export interface Message {
  _id: ObjectId | string;
  sender: string;
  text: string;
  date: Date;
}

export interface Friendship {
  _id: ObjectId | string;
  user1: User;
  user2: User;
  status: "pending" | "accepted";
}
