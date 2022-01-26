const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNotes(title, tag) {
	const notesDB = await getNotes()
	const note = {
		title,
		tag,
		id: Date.now().toString()
	}
	notesDB.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notesDB))

	console.log(chalk.green.inverse("Note added!"))
}

async function getNotes() {
	const notesDB = await fs.readFile(notesPath, { encoding: "utf-8" })
	return Array.isArray(JSON.parse(notesDB)) ? JSON.parse(notesDB) : []
}

async function printNotes() {
	const notesDB = await getNotes()
	console.log(chalk.inverse("This is list of notes: "))
	notesDB.forEach(note => {
		console.log(chalk.yellow.inverse(JSON.stringify(note)))
	})
}

module.exports = {
	addNotes,
	printNotes
}