import { google } from "googleapis";
import { CredentialBody } from "google-auth-library";

import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "../config/constants";

// from the google quick start guide:
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Load or request or authorization to call APIs.
 *
 */
export const authorize = async () => {
  const credentials: CredentialBody = {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
  };

  const client = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  return client;
};
