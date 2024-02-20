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
