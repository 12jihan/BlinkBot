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
  REST,
  SlashCommandBuilder,
} from "discord.js";
import { joinVoiceChannel, createAudioPlayer } from "@discordjs/voice";
import ytdl from "ytdl-core";
import dotenv from "dotenv";
import SlashCommandManager from "./SlashCommandManager/SlashCommandManager";
dotenv.config();

// const queue = new Map();
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN!);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Imports for instances
const scm: SlashCommandManager = new SlashCommandManager(rest);

client.on(Events.ClientReady, (): void => {
  console.log("someone is ready!");
});

client.on(Events.GuildMemberAdd, (info: GuildMember) => {
  console.log("new guy here", info);
});

client.on(Events.MessageCreate, (message: OmitPartialGroupDMChannel<Message<boolean>>): void => {
  if (message.content.length >= 2 && message.author.id != process.env.BOT_ID) {
    message.channel.send(message.content);
  } else {
    console.log(message.content);
  }
});

client.login(process.env.BOT_TOKEN);

async function createCommands(): Promise<void> {
  console.log("used");

  // Creates commands:
  await client.application?.commands
    .create({
      name: "crazy",
      description: "does stuff",
    })
    .then(console.log)
    .catch(console.error);
}
