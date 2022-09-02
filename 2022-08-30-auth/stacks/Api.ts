import {
  StackContext,
  use,
  Api as ApiGateway,
  Config,
  Auth
} from "@serverless-stack/resources";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const auth = new Auth(stack, "auth", {
    authenticator: {
      config: [new Config.Secret(stack, "GOOGLE_CLIENT_ID")],
      handler: "functions/auth/auth.handler"
    }
  });

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        permissions: [db.table],
        config: [db.TABLE_NAME]
      }
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
          environment: {
            FOO: "test"
          }
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm"
        ]
      }
    }
  });

  auth.attach(stack, { api });

  new Config.Parameter(stack, "API_URL", {
    value: api.url
  });

  stack.addOutputs({
    API_URL_OUTPUT: api.url
  });

  return api;
}
