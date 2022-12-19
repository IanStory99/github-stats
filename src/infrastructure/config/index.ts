import { config } from "dotenv";
config({ path: ".env" });

export const {
  NODE_ENV,
  DATABASE_URL,
  GRAPHQL_GITHUB,
  GRAPHQL_TOKEN
} = process.env;
