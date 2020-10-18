import { Command, CommandExecute } from "../types/bot";
import { EGHIZIO_DISCORD_ID } from "../../config.json";


const help: CommandExecute = (message, args, client) => {
    if(message.author.bot) return;
    
    let commands: { name: string; value: string }[] = [];
    if(client){
        commands = client.commands.map(command => {
            const { name, description: value } = command;
            return ({ name, value });
        });
    }

    commands.sort((a, b) => a.name > b.name ? 1 : -1); // sort alphabeticaly by name

    // fields do not work belowe node -v 12, workaround
    const description = commands.reduce((acc, el) => {
        acc += `> ${el.name} - ${el.value}\n`;
        return acc;
    }, "");

    if(commands.length) message.channel.send({ embed: { title: "Help", description } });
    else message.channel.send("I am sorry. I wasn't able to get any informations that could help You at this time. Please try later.");
};

const command: Command = {
    name: "help",
    description: "Lists all available commends of Alice!",
    execute: help
};

export default command;