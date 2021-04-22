import Discord from "discord.js";
import { Command, CommandExecute } from "../types/bot";


const help: CommandExecute = (message, args, client) => {
    if(message.author.bot) return;
    
    if(!client) return message.channel.send("I am sorry. I wasn't able to get any informations that could help You at this time. Please try later.");

    const helpEmbed = new Discord.MessageEmbed()
        .setColor("#e91e63")
        .setAuthor("Alice")
        .setTitle("Help - List of all commands");
    
    const commands = Array
        .from(client.commands.map(({ execute, ...command }) => command))
        .sort((a, b) => a.name > b.name ? 1 : -1); // sort alphabeticaly by name

    commands.forEach(({ name, description }) => {
        helpEmbed.addField(name, description);
    });
    
    if(commands.length) message.channel.send(helpEmbed);
};

const command: Command = {
    name: "help",
    description: "Lists all available commands of Alice!",
    execute: help
};

export default command;