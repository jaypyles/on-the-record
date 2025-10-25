import { autoForwardProcedure } from "@/server/trpc";

export const clear = autoForwardProcedure.mutation(async ({ input, ctx }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/clear`, {
    method: "POST",
    headers: {
      ...ctx.forwardHeaders,
      "Content-Type": "application/json",
      Cookie: `session_id=${ctx.sessionId}`,
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Clear cart failed.");
  }

  return data;
});
