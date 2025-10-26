import { autoForwardProcedure } from "@/server/trpc";
import { z } from "zod";

export const verifyCode = autoForwardProcedure
  .input(
    z.object({
      discount_code: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/checkout/verify-discount`,
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
      throw new Error(data.detail || "Verify code failed.");
    }

    return data;
  });
