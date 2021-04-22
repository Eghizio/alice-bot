import Discord from "discord.js";
import fetch from "node-fetch";
import capitalizeFirst from "../utils/capitalizeFirst"
import { Command, CommandExecute } from "../types/bot";


const yesno: CommandExecute = async (message, args, client) => {
    if(message.author.bot) return;
    
    const URL = args[0] ? `https://yesno.wtf/api?force=${args[0]}` : "https://yesno.wtf/api";

    const response = await fetch(URL);
    const { answer, image } = (await response.json()) as ApiResponse;

    const answerEmbed = new Discord.MessageEmbed()
        .setColor("#e91e63")
        .setAuthor("Alice")
        .setTitle(capitalizeFirst(answer))
        .setImage(image);
    
    message.channel.send(answerEmbed);
};

const command: Command = {
    name: "yesno",
    description: "Makes a decision for you!",
    execute: yesno
};

export default command;


interface ApiResponse {
    answer: string;
    forced: boolean;
    image: string;
};