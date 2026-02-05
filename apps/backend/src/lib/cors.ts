export const corsConfig = {
  origin: (origin: string | undefined) => {
    const allowedOrigins = process.env.TRUSTED_ORIGINS?.split(",") || [
      "http://localhost:1111",
    ];
    if (!origin) return allowedOrigins[0];
    return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  },
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "OPTIONS"],
  credentials: true,
};
