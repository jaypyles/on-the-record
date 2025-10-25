import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { initTRPC } from "@trpc/server";
import cookie from "cookie";
import { getServerSession } from "next-auth";
import SuperJSON from "superjson";

export const createContext = async ({ req, res }: any) => {
  const session = await getServerSession(req, res, authOptions);

  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  let sessionId = cookies["session_id"];

  console.log({ sessionId });

  return {
    session,
    sessionId,
    forwardHeaders: {} as Record<string, string>,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new Error("UNAUTHORIZED");
  }
  return next({ ctx: { session: ctx.session } });
});

export const autoForwardProcedure = t.procedure.use(({ ctx, next }) => {
  if (ctx.session?.user?.jwt) {
    ctx.forwardHeaders = { Authorization: `Bearer ${ctx.session.user.jwt}` };
  } else {
    ctx.forwardHeaders = {};
  }

  return next({ ctx });
});
