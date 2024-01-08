import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { authorize } from "./src/integrations/g-auth";
import { getDiscordTags } from "./src/integrations/g-sheets";
import { runDiscordBot } from "./src/integrations/discord";

/**
 * Cloud http function that runs the discord bot and assigns roles
 *
 * @param {Request} req - the API request
 * @param {Response} res - the API response
 */
export const http: HttpFunction = async (req: Request, res: Response) => {
  try {
    const client = await authorize();
    const tags = await getDiscordTags(client);

    await runDiscordBot(tags);

    res.status(200).send("Roles updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
