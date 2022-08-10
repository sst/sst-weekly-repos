import { createReactQueryHooks } from "@trpc/react";
import type { Router } from "../../services/functions/trpc";

export const trpc = createReactQueryHooks<Router>();
