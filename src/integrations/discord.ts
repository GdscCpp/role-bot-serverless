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
  try {
    const guild = await client.guilds.fetch(DISCORD_SERVER_ID);
    const role = await guild.roles.fetch("1126205202488365137");
    const members = await guild.members.fetch();

    members.map((member) => {
      for (let i = 0; i < tags.length; i++) {
        // assign roles if necessary
        const shouldAssignRole =
          (tags[i] + "#0" == member.user.tag || tags[i] == member.user.tag) &&
          !member.roles.cache.some((role) => role.name === "General Member");

        if (shouldAssignRole && role) {
          member.roles.add(role);
          console.log(`Role assigned to ${member.user.tag}`);
        }
      }
    });
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
