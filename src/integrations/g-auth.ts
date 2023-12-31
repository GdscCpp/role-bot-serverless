import { google } from "googleapis";
import { CredentialBody } from "google-auth-library";

import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from "../config/constants";
import { GoogleAuth } from "googleapis-common";

// from the google quick start guide:
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Integration function that authorizes the client with Google.
 *
 * @returns {Promise<google.auth.GoogleAuth>} - the authorized client
 */
export const authorize = async (): Promise<GoogleAuth> => {
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
