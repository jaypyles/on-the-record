import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/trpc";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSideProps } from "next";
import SuperJSON from "superjson";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  if (!id || typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
    transformer: SuperJSON,
  });

  try {
    const [articleData, youMayLikeData] = await Promise.all([
      helpers.articleRouter.get.fetch({
        id: id,
        page: 1,
        size: 1,
      }),
      helpers.artistRouter.youMayLike.fetch(),
    ]);

    if (!articleData.items || articleData.items.length === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        article: articleData.items[0],
        youMayLikeArtists: youMayLikeData.items || [],
      },
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return {
      notFound: true,
    };
  }
};
