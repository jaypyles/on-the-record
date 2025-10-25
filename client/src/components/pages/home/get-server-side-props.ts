import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSideProps } from "next";
import SuperJSON from "superjson";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
    transformer: SuperJSON,
  });

  const data = await helpers.artistRouter.recentlyViewed.fetch();

  return {
    props: {
      artists: data.items,
      total: 0,
    },
  };
};
