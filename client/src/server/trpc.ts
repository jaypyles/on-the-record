import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";

export const createContext = async ({ req, res }: any) => {
  const session = await getServerSession(req, res, authOptions);
  return { session };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new Error("UNAUTHORIZED");
  }
  return next({ ctx: { session: ctx.session } });
});
