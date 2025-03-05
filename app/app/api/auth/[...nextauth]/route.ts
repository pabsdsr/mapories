import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {

      session.user.id = token.sub!;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
        if (user.email === 'pabs.dsr123@gmail.com') {
            return true;
        } else {
            return false;
        }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
