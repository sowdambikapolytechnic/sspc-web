import { RoleName } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleName;
      roleId: string;
      departmentId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
    role: RoleName;
    roleId: string;
    departmentId: string | null;
  }
}
