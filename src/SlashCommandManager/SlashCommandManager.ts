
import { REST, SlashCommandBuilder, Routes, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import * as commandData from "./SlashCommands.json";
import { SlashCommandType } from "../types/commands";

export default class SlashCommandManager {
  private readonly rest: REST;
  private readonly commands: RESTPostAPIApplicationCommandsJSONBody[];

  constructor(rest: REST) {
    this.rest = rest;
    this.commands = this.validateCommands(commandData.commands);
    this.initialize().catch(console.error);
  }

  /**
   * Validates and transforms commands from JSON
   */
  private validateCommands(commands: unknown): RESTPostAPIApplicationCommandsJSONBody[] {
    if (!Array.isArray(commands)) {
      throw new Error("Commands must be an array");
    }

    return commands.map(cmd => {
      // If it's already a proper command object
      if (typeof cmd === "object" && cmd !== null && "name" in cmd && "description" in cmd) {
        return cmd as RESTPostAPIApplicationCommandsJSONBody;
      }

      // If it's a builder that needs conversion
      if (cmd instanceof SlashCommandBuilder) {
        return cmd.toJSON();
      }

      throw new Error(`Invalid command format: ${JSON.stringify(cmd)}`);
    });
  }

  /**
   * Registers all commands with Discord
   */
  public async initialize(): Promise<void> {
    if (!process.env.APP_ID) throw new Error("APP_ID environment variable missing");
    if (!process.env.GUILD_ID) throw new Error("GUILD_ID environment variable missing");
    if (this.commands.length === 0) {
      console.warn("No commands to register");
      return;
    }

    try {
      console.log(`Registering ${this.commands.length} commands...`);

      const result = await this.rest.put(
        Routes.applicationGuildCommands(
          process.env.APP_ID,
          process.env.GUILD_ID
        ),
        { body: this.commands }
      ) as unknown[];

      console.log(`Successfully registered ${result.length} commands`);
    } catch (error) {
      console.error("Failed to register commands:", error);
      throw error; // Re-throw for calling code to handle
    }
  }

  /**
   * Creates a new slash command (builder pattern)
   */
  public createSlashCommand(): SlashCommandBuilder {
    return new SlashCommandBuilder();
  }

  /**
   * Helper to get all command names
   */
  public getCommandNames(): string[] {
    return this.commands.map(cmd => cmd.name);
  }
}

