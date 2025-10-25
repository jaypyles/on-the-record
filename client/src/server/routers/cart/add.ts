import { autoForwardProcedure } from "@/server/trpc";
import { z } from "zod";

export const add = autoForwardProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/add/${input.id}`,
      {
        method: "POST",
        headers: {
          ...ctx.forwardHeaders,
          "Content-Type": "application/json",
          Cookie: `session_id=${ctx.sessionId}`,
        },
        credentials: "include",
        body: JSON.stringify(input),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Add to cart failed.");
    }

    return data;
  });
