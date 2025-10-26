import { router } from "@/server/trpc";
import { get } from "./get";
import { recentlyViewed } from "./recently-viewed";
import { youMayLike } from "./you-may-like";

export const artistRouter = router({ get, recentlyViewed, youMayLike });
