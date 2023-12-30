import * as path from 'path';
import * as fs from 'fs/promises'
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

import { authenticate } from '@google-cloud/local-auth';

// from the google quick start guide:
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */

export const loadSavedCredentialsIfExist = async (): Promise<OAuth2Client | null> => {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content.toString());

        return google.auth.fromJSON(credentials) as OAuth2Client;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
export const saveCredentials = async (client: OAuth2Client): Promise<void> => {
    const content = await fs.readFile(CREDENTIALS_PATH);

    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;

    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    })

    await fs.writeFile(TOKEN_PATH, payload);
}


/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }
  