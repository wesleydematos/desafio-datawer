import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string | unknown;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
  }
}
