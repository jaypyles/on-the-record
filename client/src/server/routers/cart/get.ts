import { autoForwardProcedure } from "@/server/trpc";

export const get = autoForwardProcedure.query(async ({ ctx }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "GET",
    headers: {
      ...ctx.forwardHeaders,
      "Content-Type": "application/json",
      Cookie: `session_id=${ctx.sessionId}`,
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Getting cart failed.");
  }

  return data;
});
