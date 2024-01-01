/**
 * @fileoverview This is the main entry point for the Google Apps Script
 */
export const roleAssign = () => {
  const url =
    "https://us-west1-gdsc-role-bot.cloudfunctions.net/role-bot-serverless-dev-role-assign";
  const result = UrlFetchApp.fetch(url);

  Logger.log(result.getContentText());
};
