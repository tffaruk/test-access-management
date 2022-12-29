// import { Axios } from "@lib/axios";
import Axios from "@/lib/axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // CredentialsProvider({
    //   type: "credentials",

    //   credentials: {},
    //   async authorize(credentials, req) {
    //     // Add logic here to look up the user from the credentials supplied
    //     const { email, password } = credentials;
    //     const res = await Axios.get("/admin/");

    //     // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

    //     if (
    //       res.data.result.map((data) => data.email).includes(email) &&
    //       res.data.result.map((data) => data.password).includes(password)
    //     ) {
    //       return {
    //         email: email,

    //         // role: res.data.result[0].role,
    //       };
    //     }
    //     return null;
    //   },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      const AllUser = await Axios.get("user");
      const Admin = await Axios.get("admin");
      const { admin } = Admin.data;
      console.log(admin);

      const { users } = AllUser.data;
      if (
        users.map((el) => el.email).includes(user.email) ||
        admin.map((el) => el.email).includes(user.email)
      ) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token }) {
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      // console.log(token);
      return { session, token };
    },
  },

  theme: {
    colorScheme: "light",
  },
};
process.env.NODE_ENV !== "production";
export default NextAuth(authOptions);
