import {
  ChannelManager,
  Client,
  Events,
  GatewayIntentBits,
  Guild,
  GuildMember,
  GuildResolvable,
  Message,
  OmitPartialGroupDMChannel,
  SlashCommandBuilder,
} from "discord.js";
import { joinVoiceChannel, createAudioPlayer } from "@discordjs/voice";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
dotenv.config();

const queue = new Map();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    // GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on("ready", (): void => {
  console.log("someone is ready!");
});

client.on("guildMemberAdd", (info: GuildMember) => {
  console.log("new guy here", info);
});

client.on(
  Events.MessageCreate,
  (message: OmitPartialGroupDMChannel<Message<boolean>>): void => {
    if (message.content.length > 2) {
      console.log("message:", message);
      // message.channel.sendTyping();

      if (message.content === "create") {
        createCommands();
      }
    }
    // const guildPreview = await client.fetchGuildPreview(guildID);
    // console.log("guild info:", guildPreview);
  },
);

client.login(process.env.DISCORD_TOKEN);

client;

function createCommands(): void {
  console.log("used");

  // Creates commands:
  client.application?.commands
    .create({
      name: "crazy",
      description: "does stuff",
    })
    .then(console.log)
    .catch(console.error);
}
