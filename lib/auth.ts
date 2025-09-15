import type { NextAuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUserByUsername } from "./users";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) return null;
        const user = getUserByUsername(credentials.username);
        if (!user) return null;
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        const authed: User & { role: "admin" | "customer" } = {
          id: user.id,
          name: user.username,
          role: user.role,
        } as unknown as User & { role: "admin" | "customer" };
        return authed;
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      const extendedToken = token as JWT & { role?: "admin" | "customer" };
      if (user) {
        const u = user as User & { role?: "admin" | "customer" };
        extendedToken.role = u.role;
      }
      return extendedToken;
    },
    async session({ session, token }) {
      const extendedToken = token as JWT & { role?: "admin" | "customer" };
      if (session.user) {
        session.user.id = (token.sub as string) ?? "";
        session.user.role = extendedToken.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

