import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      text: String,
      date: Date,
    },
  ],
});

export const Chat = models.Chat || model("Chat", ChatSchema);
