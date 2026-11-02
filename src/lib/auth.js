import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const globalForMongo = globalThis;
if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = new MongoClient(process.env.MONGODB_URI);
}
const client = globalForMongo.mongoClient;
const db = client.db("BookNook");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    jwt({
      jwt: {

        definePayload: ({ user }) => ({
          email: user.email,
          name: user.name,
        }),
      },
    }),
    nextCookies(),
  ],
});