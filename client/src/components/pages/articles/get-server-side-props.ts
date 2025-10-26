import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSideProps } from "next";
import SuperJSON from "superjson";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query = "", type = "", page = "1" } = ctx.query;

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
    transformer: SuperJSON,
  });

  const data = await helpers.articleRouter.get.fetch({
    page: parseInt(page as string),
    size: 6,
    title: query as string,
    type: type as string,
  });

  return {
    props: {
      articles: data.items,
      total: data.total,
    },
  };
};
