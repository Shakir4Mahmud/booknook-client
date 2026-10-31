import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;

// Express server-er jonno token. Protected API call-e Authorization header-e dibo.
export async function getToken() {
  const result = await authClient.token();
  return result.data ? result.data.token : null;
}