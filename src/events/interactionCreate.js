const { Collection } = require('discord.js');
const path = require('path');
const fs = require('fs');

const commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname,'/../commands')).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	commands.set(command.data.name, command);
}

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};