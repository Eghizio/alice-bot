const {
    EGHIZIO_DISCORD_ID,
    SHELL_CHANNEL_ID,
    ALICE_CHANNEL_ID
} = process.env;

// kinda doesnt work sometimes ?
export const isEghizio = (id: string) => id === EGHIZIO_DISCORD_ID;
export const isShellChannel = (id: string) => id === SHELL_CHANNEL_ID;
export const isAliceChannel = (id: string) => id === ALICE_CHANNEL_ID;