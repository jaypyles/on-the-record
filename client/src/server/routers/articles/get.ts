import { autoForwardProcedure } from "@/server/trpc";
import { Article, ArticleType } from "@/types/article.types";
import { z } from "zod";

type ServerArticle = {
  id: number;
  title: string;
  subTitle: string;
  author: string;
  created: string;
  content: string;
  image: string;
  type: string;
  genre: string;
};

export const get = autoForwardProcedure
  .input(
    z.object({
      page: z.number().min(1).optional().default(1),
      size: z.number().min(1).max(100).optional().default(20),
      title: z.string().optional(),
      type: z.string().optional(),
      id: z.string().optional(),
      get_favorite: z.boolean().optional(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { page, size, title, type, id, get_favorite } = input;

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    if (title) params.append("title", title);
    if (type) params.append("type", type);
    if (id) params.append("id", id);
    if (get_favorite) params.append("get_favorite", "true");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles?${params.toString()}`,
      {
        headers: {
          ...ctx.forwardHeaders,
          "Content-Type": "application/json",
          Cookie: `session_id=${ctx.sessionId}`,
        },
        credentials: "include",
      }
    );

    const data: { items: ServerArticle[]; total: number } = await res.json();

    if (!res.ok) {
      throw new Error((data as any).detail || "Failed to fetch articles");
    }

    console.log(data.items[0]);

    return {
      items: data.items.map<Article>((item) => ({
        id: item.id.toString(),
        title: item.title,
        subTitle: item.subTitle,
        author: item.author,
        created: item.created,
        content: item.content,
        image: item.image,
        type: item.type as ArticleType,
        href: `/articles/${item.id}`,
        genre: item.genre,
      })),
      total: data.total,
    };
  });
