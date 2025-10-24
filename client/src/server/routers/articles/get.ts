import { publicProcedure } from "@/server/trpc";
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
};

export const get = publicProcedure
  .input(
    z.object({
      page: z.number().min(1).optional().default(1),
      size: z.number().min(1).max(100).optional().default(20),
      title: z.string().optional(),
      type: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    const { page, size, title, type } = input;

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    if (title) params.append("title", title);
    if (type) params.append("type", type);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/articles?${params.toString()}`
    );

    const data: { items: ServerArticle[]; total: number } = await res.json();

    if (!res.ok) {
      throw new Error((data as any).detail || "Failed to fetch articles");
    }

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
      })),
      total: data.total,
    };
  });
