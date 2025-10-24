import { router } from "@/server/trpc";
import { get } from "./get";

export const articleRouter = router({ get });
