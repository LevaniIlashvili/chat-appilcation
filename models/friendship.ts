import { Schema, model, models } from "mongoose";

const FriendshipSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User1 is required"],
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User2 is required"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
});

export const Friendship =
  models.Friendship || model("Friendship", FriendshipSchema);
