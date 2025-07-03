import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession, NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt"
import { dbconnect } from "../../../../lib/dbconnect"
import userModel from "@/models/userModel";
import "next-auth"
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth"{
    interface User{
        _id? : string,
    }

    interface Session{
        user: {
            _id? : string,
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt"{
    interface JWT {
        _id? : string,
    }
}
export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Enter your name" },
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbconnect();

        try {
          const user = await userModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error) {
          throw new Error("Error while signing in");
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  pages: {
    signIn: "/signin"
  },

  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTSECRECT,

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // Sync Google users to DB
        await dbconnect();
        const existingUser = await userModel.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await userModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
          });
          token._id = newUser._id.toString();
        } else {
          token._id = existingUser._id.toString();
        }

        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.name = token.name;
      }

      return session;
    }
  }
};


