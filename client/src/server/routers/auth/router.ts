import { router } from "@/server/trpc";
import { login } from "./login";

export const authRouter = router({ login });
