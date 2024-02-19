"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Friendship } from "@/models/friendship";
import { User } from "@/models/user";
import { Session, getServerSession } from "next-auth";
import { z } from "zod";

const createFriendRequestSchema = z.object({
  email: z.string().email(),
});

interface CreateFriendRequestFormState {
  errors: {
    email?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function sendFriendRequest(
  formState: CreateFriendRequestFormState,
  formData: FormData
) {
  console.log("form data" + formData);
  const result = createFriendRequestSchema.safeParse({
    email: formData.get("email"),
  });

  if (!result.success) {
    return {
      errors: {
        email: result.error.flatten().fieldErrors.email,
      },
    };
  }

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  const user = await User.findOne({ email: formData.get("email") });

  if (!user) {
    return {
      errors: {
        email: ["User not found"],
      },
    };
  }

  if (user.email === session.user.email) {
    return {
      errors: {
        email: ["You cannot send a friend request to yourself"],
      },
    };
  }

  const friendship = await Friendship.findOne({
    $or: [
      { user1: session.user.id, user2: user.id },
      { user1: user.id, user2: session.user.id },
    ],
  });

  if (friendship) {
    return {
      errors: {
        email: ["Friend request already sent or accepted"],
      },
    };
  }

  console.log(session, user.id);

  try {
    await Friendship.create({
      user1: session.user.id,
      user2: user.id,
      status: "pending",
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  return {
    errors: {},
  };
}
