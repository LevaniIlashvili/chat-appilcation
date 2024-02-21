"use server";
import { authOptions } from "@/authOptions";
import { Chat } from "@/models/chat";
import { Friendship } from "@/models/friendship";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function respondToFriendRequest(
  userId: string,
  response: "accept" | "reject"
) {
  const session = await getServerSession(authOptions);

  try {
    if (response === "accept") {
      await Friendship.updateOne(
        { user1: userId, user2: session.user.id },
        { status: "accepted" }
      );
      await Chat.create({
        users: [userId, session.user.id],
        messages: [],
      });
    } else {
      await Friendship.findOneAndDelete({
        user1: userId,
        user2: session.user.id,
      });
    }
    revalidatePath("/dashboard/requests");
  } catch (error) {
    console.log(error);
  }
}
