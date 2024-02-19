import { Friendship } from "@/models/friendship";

export const fetchFriendRequests = (userId: string) => {
  return Friendship.find({ user2: userId, status: "pending" }).populate(
    "user1"
  );
};

export const fetchFriendships = (userId: string) => {
  return Friendship.find({
    $or: [{ user1: userId }, { user2: userId }],
    status: "accepted",
  }).populate("user1 user2");
};
