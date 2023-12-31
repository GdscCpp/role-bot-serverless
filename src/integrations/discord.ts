import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_BOT_TOKEN, DISCORD_SERVER_ID } from "../config/constants";

const client: Client<true> = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

/**
 * Integration function that assigns roles to users based on their discord tags
 *
 * @param {string[]} tags - array of discord tags to assign roles to
 */
export const assignRoles = async (tags: string[]) => {
  //filter through results and assign roles
  console.log("Fetching users...");
  let guild = await client.guilds.fetch(DISCORD_SERVER_ID);

  //fetch roles
  let role = guild.roles.cache.find((role) => role.name === "General Member");

  try {
    // assign roles if necessary
    const members = await guild.members.fetch();

    members.map((member) => {
      for (let i = 0; i < tags.length; i++) {
        if (
          (tags[i] + "#0" == member.user.tag || tags[i] == member.user.tag) &&
          member.roles.cache.find((role) => role.name === "General Member") ===
            undefined
        ) {
          member.roles.add(role!);
          console.log("Role added for " + member.user.tag);
        }
      }
    });

    console.log("Roles updated");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Integration function that runs the discord bot and assigns roles. A separate function is needed to run the bot because of Node async issues.
 *
 * @param tags - array of discord tags to assign roles to
 */
export const runDiscordBot = async (tags: string[]) => {
  await client.login(DISCORD_BOT_TOKEN);
  await assignRoles(tags);
};
