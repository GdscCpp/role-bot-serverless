import { sheets_v4 } from "googleapis";
import { GlobalOptions } from "googleapis/build/src/apis/abusiveexperiencereport";
import { GOOGLE_SHEETS_ID } from "../config/constants";
import { google } from "googleapis";

/**
 * Integration function for retrieving the discord tags from the 'GDSC Club Data 23-24' Google Sheet.
 *
 * @param {GlobalOptions["auth"]} auth
 */
export const getDiscordTags = async (
  auth: GlobalOptions["auth"],
): Promise<string[]> => {
  const OPTIONS: sheets_v4.Options = { version: "v4", auth };
  const BODY = {
    spreadsheetId: GOOGLE_SHEETS_ID,
    range: "General Membership!E2:E",
  };

  const sheets = google.sheets(OPTIONS);
  const res = await sheets.spreadsheets.values.get(BODY);

  const tags = res.data.values?.map((tag) => tag[0]);
  return tags as string[];
};
