import { router } from "@/server/trpc";
import { get } from "./get";
import { recentlyViewed } from "./recently-viewed";

export const artistRouter = router({ get, recentlyViewed });
