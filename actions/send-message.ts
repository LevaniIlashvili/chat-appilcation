"use server";

import { Chat } from "@/models/chat";

export async function sendMessage(
  chatId: string,
  senderId: string,
  message: string
) {
  if (!message) return;

  try {
    await Chat.findByIdAndUpdate(chatId, {
      $push: {
        messages: {
          sender: senderId,
          text: message,
          date: new Date(),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
