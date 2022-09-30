const { SelectMenuOptionBuilder } = require("@discordjs/builders");
const { SelectMenuBuilder, ActionRowBuilder } = require("discord.js");

function buildOptions(menu, options){
	let menuOptions = [];
	for (const o in options) {
		let option = options[o];
		let data = {
			label: `${option.label}`,
			value: `${option.id}`,
		};
		if(option.emoji) data.emoji = {name: option.emoji};
		menuOptions.push(new SelectMenuOptionBuilder(data));
	};

	menu.addOptions(menuOptions);
	return menu
}

function buildMenu(menu, menuInfos){
	if(menuInfos.emoji) menuInfos.placeholder = `${menuInfos.emoji} ${menuInfos.placeholder}`;
	if(menuInfos.placeholder) menu.setPlaceholder(menuInfos.placeholder);
	if(menuInfos.min_values) menu.setMinValues(menuInfos.min_values);
	if(menuInfos.max_values) menu.setMaxValues(menuInfos.max_values);
	if(menuInfos.id) menu.setCustomId(menuInfos.id);
	if(menuInfos.roles) menu = buildOptions(menu, menuInfos.roles);
	return menu;
}

function buildRow(row, menuInfos){
	let menu = buildMenu(new SelectMenuBuilder(), menuInfos);
	row = new ActionRowBuilder().addComponents(menu);

	return row
}

function buildRows(rows, allMenusInfos){
	for (const m in allMenusInfos) {
		let menuInfos = allMenusInfos[m];
		let row = buildRow(new ActionRowBuilder(), menuInfos);
		rows.push(row);
	};
	return rows;
}


module.exports = {
	help: {
		name: "roles",
		description: "Send Choose roles message",
		slash: false,
		category: "messages",
		aliases: ["roles"],
		usage: "roles",
		cooldown: 5,
		permission: "Administrator",
		deletemsg: true,
	},
	dev: true,
	run: async(client, message, args) => {

		let AutoRoles = client.config.autoroles;

		let rows = buildRows([], [AutoRoles.filiere, AutoRoles.niveau]);
		let rows2 = buildRows([], [AutoRoles.options, AutoRoles.specialites]);

		message.channel.send({ content: `Vous pouvez ici choisir vos rôles en fonctions de votre filière et votre niveau.`, components: rows });

		message.channel.send({ content: `Vous pouvez également choisir vos options et vos spés`, components: rows2 });
		
	}
};