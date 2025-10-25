import { router } from "../trpc";
import { articleRouter } from "./articles/router";
import { artistRouter } from "./artists/router";
import { authRouter } from "./auth/router";
import { cartRouter } from "./cart/router";

export const appRouter = router({
  authRouter,
  artistRouter,
  articleRouter,
  cartRouter
});

export type AppRouter = typeof appRouter;
