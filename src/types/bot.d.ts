import { Client, Collection, Message } from "discord.js";

export default interface BotClient extends Client {
    name: string;
    prefix: string;
    commands: Collection<string, Command>;
}

export interface Command {
    name: string;
    description: string;
    execute: CommandExecute;
}
export type CommandExecute = (message: Message, args: string[], client?: BotClient) => void;