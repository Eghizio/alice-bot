import { Command, CommandExecute } from "../types/bot";
import { EGHIZIO_DISCORD_ID } from "../../config.json";


const rollSymbol = (): string => {
    const symbols: string[] = [];
    return (Math.random() > 0.4)
        ? (symbols[Math.floor(Math.random()*symbols.length)] || "")
        : "";
};

const hi: CommandExecute = (message, args) => {
    if(message.author.bot) return;
    
    const symbol = message.author.id === EGHIZIO_DISCORD_ID ? ":heart:" : rollSymbol();
    
    message.channel.send(`Hi <@${message.author.id}> ${symbol}`);
};

const command: Command = {
    name: "hi",
    description: "Say Hi to Alice!",
    execute: hi
};

export default command;