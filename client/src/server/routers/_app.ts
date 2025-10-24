import { router } from "../trpc";
import { articleRouter } from "./articles/router";
import { artistRouter } from "./artists/router";
import { authRouter } from "./auth/router";

export const appRouter = router({
  authRouter,
  artistRouter,
  articleRouter,
});

export type AppRouter = typeof appRouter;
