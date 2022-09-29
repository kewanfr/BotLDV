// Require the necessary discord.js classes
const { Client, Partials, Collection } = require("discord.js");
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;

const Logger = require("./core/logger");
require("./core/includes");

console.log("[Discord.js]", "Initializing...");

// Require Modules
const ms = require("ms");

// Import Config
const config = require("./config.js");
const { TOKEN } = config;

const client = new Client({
  // intents: 131071,
  intents: 3276799,
  partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent],
  allowedMentions: { parse: ["everyone", "roles", "users"] },
  rest: { timeout: ms("1m") }
});

client.config = config;

// Create all components collections
client.commands = new Collection();
client.slashCommands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();

// Import functions
client.log = Logger;
require("./functions/functions.js")(client);

// Import Events Handler
require("./core/handlers/CommandsHandler")(client);
require("./core/handlers/ComponentsHandler")(client);
require("./core/handlers/EventsHandler")(client);

process.on("exit", code => { client.log.client(`Le processus s'est arrêté avec le code: ${code}!`) });
process.on("uncaughtException", (err, origin) => {
  client.log.error(`UNCAUGHT_EXCEPTION: ${err}`);
  console._error(`Origine: ${origin}`)
});
process.on("unhandledRejection", (reason, promise) => {
  client.log.warn(`UNHANDLED_REJECTION: ${reason}`);
  console._log(promise);
});
process.on("warning", (...args) => client.log.warn(...args));

module.exports = client;

client.login(TOKEN);