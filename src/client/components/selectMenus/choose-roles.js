module.exports = {
  data: {
    name: 'choose-roles',
    ids: [
      "filiere",
      "niveau",
      "options",
      "specialites"
    ]
  },
  async execute(client, interaction) {
    let customId = interaction.customId;
    let menuInfos = client.config.autoroles[customId];

    let values = interaction.values;
    let member = interaction.member;
    let guild = interaction.guild;

    let rolesToAdd = [];
    values.forEach(value => {
      let role = menuInfos.roles.find(r => r.id == value);
      rolesToAdd.push(role);
    });

    menuInfos.roles.forEach(role => {
      if(!rolesToAdd.includes(role) && member.roles.cache.get(role.role)) member.roles.remove(role.role);
    });

    rolesToAdd.forEach(role => {
      member.roles.add(role.role);
    });

    await interaction.reply({
      content: `✅ ${rolesToAdd.length > 1 ? "Les roles" : "Le role"} **${rolesToAdd.map((r) => `<@&${r.role}>`).join(", ")}** ${rolesToAdd.length > 1 ? "ont été ajoutés" : "a été ajouté"} à votre profil.`,
      ephemeral: true
    })

  }
}