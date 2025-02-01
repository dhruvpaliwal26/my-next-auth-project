import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; 

const handler = NextAuth({
    providers: [
        GoogleProvider({  // google authentication inside provider ko add krne ke liye 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string 
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const { email, password } = credentials;

                // Mock user authentication ke liye
                if (email === "user@example.com" && password === "password") {
                    return { id: "1", name: "Dhruv Paliwal", email };
                }
                throw new Error("Invalid credentials");
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub || "";
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
});

export { handler as GET, handler as POST };
