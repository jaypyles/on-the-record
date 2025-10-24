import { publicProcedure } from "@/server/trpc";
import { z } from "zod";

export const login = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ input }) => {
    const { email, password } = input;

    return {};
  });
