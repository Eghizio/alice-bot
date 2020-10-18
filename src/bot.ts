import Discord from "discord.js";
import dotenv from "dotenv";
import config from "../config.json";
import registerCommands from "./commands";
import BotClient, { Command } from "./types/bot";


dotenv.config();
const {
    DISCORD_BOT_NAME: name,
    PREFIX: prefix,
    LOG_CHANNEL_ID,
    EGHIZIO_DISCORD_ID,
    ALICE_CHANNEL_ID,
} = config;
const commands = new Discord.Collection<string, Command>();
const client: BotClient = Object.assign(new Discord.Client(), { name, prefix, commands });
registerCommands(client.commands);

// normalize some api/system of storing data about numbers of hits and usage
let hits = 0;


client.once("ready", () => {
    console.log("\x1b[34m%s\x1b[0m", `[bot] Initializing "${client.name}"\n${new Date}`);
    console.log("\x1b[36m%s\x1b[0m", `[${client.name}]: Hello there! I am ${client.name}!`);

    (client.channels.cache.get(LOG_CHANNEL_ID) as Discord.TextChannel).send(`I'm up @${new Date}`);
});

client.on("message", (message) => {
    const { content, author, channel } = message;
    if(author.bot || !content.startsWith(client.prefix)) return;
    hits++;
    if(channel.id !== ALICE_CHANNEL_ID && author.id !== EGHIZIO_DISCORD_ID) return;

    const args = content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.length ? args.shift()!.toLowerCase() : "";
    if(!client.commands.has(commandName)) return;

    console.log("\x1b[36m%s\x1b[0m", `[${client.name}]: (${hits}) Executing "${commandName}"`);
    const command = client.commands.get(commandName);
    try{
        if(command) command.execute(message, args, client);
    }
    catch(error) {
        console.log("\x1b[31m%s\x1b[0m", `There was an error trying to execute command "${commandName}"!`, error);
    }
});


client.login(process.env.DISCORD_BOT_TOKEN);