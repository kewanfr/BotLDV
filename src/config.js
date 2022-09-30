require("dotenv").config();
const infos = require("./infos"); // Import roles and channels ids

var globalConf = {
  ...infos,
}

var config = {
  mode: "prod",
  dev: {
    TOKEN: process.env.TOKEN,
    prefix: "!!",
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    mode: "dev",
    ...globalConf,
  },
  prod: {
    TOKEN: process.env.TOKEN,
    prefix: "!",
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,
    mode: "prod",
    ...globalConf
  },

}

module.exports = config[config.mode];
