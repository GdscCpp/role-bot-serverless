import { configDotenv } from "dotenv";

configDotenv();

// Google
export const GOOGLE_PRIVATE_KEY =
  process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n") || "";
export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || "";
export const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID || "";

// Discord
export const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID || "";
export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
