import { StackContext, Api, ViteStaticSite } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
      "GET /trpc/{proxy+}": "functions/trpc.handler",
      "POST /trpc/{proxy+}": "functions/trpc.handler",
    },
  });

  const site = new ViteStaticSite(stack, "site", {
    path: "./web",
    buildCommand: "yarn build",
    buildOutput: "dist",
    environment: {
      VITE_API_URL: api.url,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
