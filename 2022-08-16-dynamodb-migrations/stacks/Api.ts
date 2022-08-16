import {
  StackContext,
  use,
  Api as ApiGateway,
  Function
} from "@serverless-stack/resources";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        permissions: [db],
        environment: {
          TABLE_NAME: db.tableName
        }
      }
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler"
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm"
        ]
      }
    }
  });

  new Function(stack, "scrap", {
    handler: "functions/scrap.handler",
    permissions: [db],
    environment: {
      TABLE_NAME: db.tableName
    }
  });

  stack.addOutputs({
    API_URL: api.url
  });

  return api;
}
