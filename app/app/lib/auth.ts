import GoogleProvider from "next-auth/providers/google";
import { createClient } from '@/utils/supabase/server';
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/drive.readonly",
          prompt: "consent",
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile}) {

      if (account) {
        token.accessToken = account.access_token;
        token.email = profile?.email;
      }

      return token
    },
    async session({ session, token }) {

      session.user.id = token.sub!;
      session.user.email = token.email;
      session.accessToken = token.accessToken as string;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const supabase = await createClient();

      const { data: fetchedUser } = await supabase.from("user").select().eq('email', user.email).single();
      const fetchedUsersId = fetchedUser?.id;

      if (!fetchedUser) {
        
        await supabase.from("user").insert([
          {
            email: user.email
          },
        ]);
        return false;
      }

      const { data: fetchWhiteListed } = await supabase.from("whitelist").select().eq('user_id', fetchedUsersId).single();

      if (fetchWhiteListed) {
          return true;
      } else {
          return false;
      }
    },
    
  },
};