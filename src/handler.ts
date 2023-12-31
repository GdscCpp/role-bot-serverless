import {
  HttpFunction,
  Request,
  Response,
} from "@google-cloud/functions-framework";
import { authorize } from "./integrations/g-auth";
import { getDiscordTags } from "./integrations/g-sheets";
import { runDiscordBot } from "./integrations/discord";

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
