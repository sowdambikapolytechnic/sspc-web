import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validation/schemas";
import { RoleName } from "@prisma/client";

import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Attach role and departmentId to JWT on first sign-in
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { roleId: true, departmentId: true, role: { select: { name: true } } },
        });
        token.roleId = dbUser?.roleId;
        token.role = dbUser?.role.name as RoleName;
        token.departmentId = dbUser?.departmentId ?? null;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.user.role = token.role as RoleName;
      session.user.roleId = token.roleId as string;
      session.user.departmentId = (token.departmentId as string) ?? null;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Authorize called with email:", credentials?.email);
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            console.error("Validation failed:", parsed.error);
            return null;
          }

          const { email, password } = parsed.data;

          const user = await db.user.findUnique({
            where: { email },
            select: {
              id: true,
              email: true,
              name: true,
              passwordHash: true,
              active: true,
              deletedAt: true,
            },
          });

          if (!user) {
            console.error("User not found in DB for:", email);
            return null;
          }
          if (!user.active || user.deletedAt) {
            console.error("User is inactive or deleted:", email);
            return null;
          }

          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) {
            console.error("Password mismatch for:", email);
            return null;
          }

          console.log("Login successful for:", email);
          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error("Prisma/Auth Error in authorize():", error);
          // By throwing an error here, the client will receive the error message 
          // instead of a generic 401, helping us debug!
          throw new Error("Auth error: " + (error as Error).message);
        }
      },
    }),
  ],
};

export const auth = () => getServerSession(authOptions);
