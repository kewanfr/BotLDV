module.exports = (client) => {

  client.generateNumber = (length) => {
    return client.generateNumberBetween(Math.pow(10, length - 1), Math.pow(10, length) - 1);
  }
  
  client.generateNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  client.verifGuild = async (guild) => {
    if (guild.id == client.config.guildID) {
      return true;
    } else {
      return false;
    }
  };
};
