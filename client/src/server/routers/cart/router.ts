import { router } from "@/server/trpc";
import { add } from "./add";
import { checkout } from "./checkout";
import { clear } from "./clear";
import { get } from "./get";
import { remove } from "./remove";

export const cartRouter = router({ add, remove, clear, get, checkout });
