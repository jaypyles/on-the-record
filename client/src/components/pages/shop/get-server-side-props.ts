import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSideProps } from "next";
import SuperJSON from "superjson";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query = "", price = "", type = "", page = "1" } = ctx.query;

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
    transformer: SuperJSON,
  });

  const data = await helpers.artistRouter.get.fetch({
    page: parseInt(page as string),
    size: 12,
    artist: query as string,
    type: type as string,
    price: price as string,
  });

  return {
    props: {
      items: data.items,
      total: data.total,
    },
  };
};
