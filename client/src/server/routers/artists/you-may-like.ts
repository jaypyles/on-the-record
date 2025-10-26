import { autoForwardProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";

export const youMayLike = autoForwardProcedure.query(async ({ ctx }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/artists/you-may-like`,
      {
        headers: {
          ...ctx.forwardHeaders,
          "Content-Type": "application/json",
          Cookie: `session_id=${ctx.sessionId}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch you-may-like artists",
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching you-may-like artists:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch you-may-like artists",
    });
  }
});
