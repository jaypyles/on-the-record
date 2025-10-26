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

  const artistsData = await helpers.artistRouter.recentlyViewed.fetch();

  let articlesData;

  if (session?.user) {
    try {
      articlesData = await helpers.articleRouter.get.fetch({
        get_favorite: true,
        page: 1,
        size: 4,
      });

      if (!articlesData.items || articlesData.items.length < 4) {
        articlesData = await helpers.articleRouter.get.fetch({
          page: 1,
          size: 4,
        });
      }
    } catch (error) {
      articlesData = await helpers.articleRouter.get.fetch({
        page: 1,
        size: 4,
      });
    }
  } else {
    articlesData = await helpers.articleRouter.get.fetch({
      page: 1,
      size: 4,
    });
  }

  return {
    props: {
      artists: artistsData.items,
      articles: articlesData.items,
      previouslyViewed: artistsData.previously_viewed,
      total: 0,
    },
  };
};
