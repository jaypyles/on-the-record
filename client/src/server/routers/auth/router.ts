import { router } from "@/server/trpc";
import { verify } from "./verify";

export const authRouter = router({ verify });
