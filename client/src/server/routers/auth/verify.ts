import { publicProcedure } from "@/server/trpc";
import { z } from "zod";

export const verify = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      code: z.string().min(4),
    })
  )
  .mutation(async ({ input }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Verification failed");
    }

    return data;
  });
