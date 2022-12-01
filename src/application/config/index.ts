import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, LOG_FORMAT, LOG_DIR } = process.env;
