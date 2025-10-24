import { router } from "../trpc";
import { artistRouter } from "./artists/router";
import { authRouter } from "./auth/router";

export const appRouter = router({
  authRouter,
  artistRouter,
});

export type AppRouter = typeof appRouter;
