import { router } from "@/server/trpc";
import { get } from "./get";

export const artistRouter = router({ get });
