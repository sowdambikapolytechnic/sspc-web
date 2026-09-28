import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { loginSchema } from "@/lib/validation/schemas";
import { RoleName } from "@prisma/client";

import { NextAuthOptions, getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as never,
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
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

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

        if (!user || !user.active || user.deletedAt) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
};

export const auth = () => getServerSession(authOptions);
