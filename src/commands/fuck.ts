import Discord from "discord.js";
import { Command, CommandExecute } from "../types/bot";


const fuck: CommandExecute = (message, args) => {
    if(message.author.bot) return;
    
    const unoReverseGif = "https://media1.tenor.com/images/ac86a0fe830a8da1a2be37d804b277c8/tenor.gif?itemid=16633402";
    const gifEmbed = new Discord.MessageEmbed().setColor("#e91e63").setThumbnail(unoReverseGif);

    message.channel.send(gifEmbed);
};

const command: Command = {
    name: "fuck",
    description: "Don't be rude to Alice!",
    execute: fuck
};

export default command;