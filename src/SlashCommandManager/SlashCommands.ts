import { SlashCommandType } from "../types/commands";

const commands: SlashCommandType[] = [
  {
    name: "play",
    description: "Play music by providing the url.",
    options: {
      name: "url",
      description: "YouTube URL of the song to play",
      type: 3, // STRING type
      required: true,
    },
  },
  {
    name: "test1",
    description:
      "This is a command that I will be using to test out other commands",
  },
  {
    name: "test2",
    description:
      "This is a command that I will be using to test out other commands",
  },
];

export default commands;
