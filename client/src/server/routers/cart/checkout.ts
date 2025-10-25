import { autoForwardProcedure } from "@/server/trpc";

export const checkout = autoForwardProcedure.mutation(async ({ ctx }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/checkout`, {
    method: "POST",
    headers: {
      ...ctx.forwardHeaders,
      "Content-Type": "application/json",
      Cookie: `session_id=${ctx.sessionId}`,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Checkout failed.");
  }

  return data;
});
