import { User } from "@/models/user";
import { connectToDb } from "@/utils/db";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing environment variables for Google OAuth");
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session.user.email });

      console.log(sessionUser);

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }: any) {
      try {
        await connectToDb();

        // check if user exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
          return true;
        }
        return true;
      } catch (error) {
        console.log(error);
        return;
      }
    },
  },
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
