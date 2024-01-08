# GDSC Role Bot Serverless

This is the repository for our new free serverless solution, which replaces our old one that would cost about $2 a month to run on a compute engine instance. It uses a combination of App Script and Cloud Functions to retrieve a list of discord tags from our [2023-2024 General Membership Google Form](https://docs.google.com/forms/d/1BiAjrmYXPiHqG0oO8Jgp5TzKTRCaegCAwBue0rL0Fw0) and apply the `General Member` role to them accordingly.

# Getting Started

- Clone this repo
- Install dependencies

```bash
npm install --save-exact
```

- Download credentials from GCP service account, place it in the root of the cloned directory and rename it to be `credentials.json`
- Clone the google app script function using [clasp](https://developers.google.com/apps-script/guides/clasp)
  - all thats needed from this is the `.clasp.json` file which is hidden in `.gitignore` for security reasons

# Testing

To test the function locally, run the following command after installing all dependencies:

```bash
npm run test
```

# Deployment

To deploy the cloud function, run the following command:

```bash
npm run deploy
```

To deploy the app script, run the following command after installing clasp:

```bash
clasp push
```

To continuously redeploy the app script while making changes, run the following command:

```bash
clasp push -wat
```
