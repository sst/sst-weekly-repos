import * as trpc from "@trpc/server";
import { z } from "zod";

const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  return {
    user: "foo",
    tenant: "blah",
  };
}; // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const router = trpc
  .router<Context>()
  .query("hello", {
    input: z.string(),
    async resolve(req) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        message: `You said ${req.input}`,
      };
    },
  })
  .query("bye", {
    input: z.object({
      message: z.string(),
    }),
    async resolve(req) {
      return {
        message: `Bye ${req.input.message}`,
      };
    },
  })
  .mutation("createTodo", {
    input: z.object({
      title: z.string(),
    }),
    async resolve(req) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        id: "1",
        title: req.input.title,
      };
    },
  });

export type Router = typeof router;

import {
  awsLambdaRequestHandler,
  CreateAWSLambdaContextOptions,
} from "@trpc/server/adapters/aws-lambda";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = awsLambdaRequestHandler({
  router,
  createContext: createContext,
});
