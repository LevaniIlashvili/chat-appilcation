import { Friendship } from "@/models/friendship";

export const fetchFriendRequests = (userId: string) => {
  return Friendship.find({ user2: userId, status: "pending" }).populate(
    "user1"
  );
};
