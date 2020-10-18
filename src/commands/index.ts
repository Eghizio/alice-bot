import { Collection } from "discord.js";
import fs from "fs";
import { Command } from "../types/bot";


const registerCommands = (commandRegistry: Collection<string, Command>): void => {
    console.log("\x1b[34m%s\x1b[0m", `[bot] Registering commands...`);
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts') && file !== "index.ts");

    for (const file of commandFiles) {
        const command: Command = require(`./${file}`).default;
        commandRegistry.set(command.name, command);
    }

    console.log("\x1b[34m%s\x1b[0m", `[bot] Registered ${commandFiles.length} commands!`);
};

export default registerCommands;