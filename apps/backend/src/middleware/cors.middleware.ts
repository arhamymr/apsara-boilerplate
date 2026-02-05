import { cors } from "hono/cors";
import { corsConfig } from "../lib/cors";

export const corsMiddleware = cors(corsConfig);
