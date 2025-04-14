export interface SlashCommandType {
  name: string;
  description: string;
  options?: {
    name: string;
    description: string;
    type: number; // STRING type
    required: boolean;
  };
}
