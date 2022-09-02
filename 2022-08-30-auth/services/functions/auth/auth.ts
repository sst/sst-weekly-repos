import { User } from "@auth/core/user";
import {
  AuthHandler,
  GoogleAdapter,
  LinkAdapter,
  Session
} from "@serverless-stack/node/auth";
import { Config } from "@serverless-stack/node/config";

declare module "@serverless-stack/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: Config.GOOGLE_CLIENT_ID,
      onSuccess: async response => {
        let exists = await User.fromEmail(response.claims().email!);
        if (!exists) {
          exists = await User.create(response.claims().email!);
        }

        return Session.parameter({
          redirect: "https://example.com",
          type: "user",
          properties: {
            userID: exists.userID
          }
        });
      }
    }),
    link: LinkAdapter({
      onLink: async (link, claims) => {
        return {
          statusCode: 200,
          body: link
        };
      },
      onSuccess: async claims => {
        let exists = await User.fromEmail(claims.email!);
        if (!exists) {
          exists = await User.create(claims.email!);
        }

        return Session.parameter({
          redirect: "https://example.com",
          type: "user",
          properties: {
            userID: exists.userID
          }
        });
      },
      onError: async () => {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: "error"
        };
      }
    })
  }
});
