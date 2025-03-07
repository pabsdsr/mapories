import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from '@/utils/supabase/server';
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
      const supabase = await createClient();
      
      const { data: fetchedUser } = await supabase.from("user").select().eq('email', user.email).single();
      const fetchedUsersId = fetchedUser?.id;

      if (!fetchedUser) {
        
        // await supabase.from("user").insert([
        //   {
        //     email: user.email,
        //     name: user.name,
        //     image: user.image,
        //   },
        // ]);
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
