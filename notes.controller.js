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

async function removeNoteById(id) {
	const notesDB = await getNotes()
	const newArrayNotes = notesDB.filter(note => note.id !== id)
	await fs.writeFile(notesPath, JSON.stringify(newArrayNotes))
	console.log(chalk.red.inverse(`Note ${id} deleted!`))
}

async function printNotes() {
	const notesDB = await getNotes()
	console.log(chalk.blue.inverse("This is list of notes: "))
	notesDB.forEach(note => {
		console.log(chalk.yellow.inverse(`Title: ${note.title}, ID: ${note.id}, Tag: ${note.tag}`))
	})
}

async function editNoteById(newTitle, id) {
	const notesDB = await getNotes()
	const index = notesDB.findIndex(note => note.id === id)
	console.log(newTitle)
	notesDB[index] = {...notesDB[index], title: newTitle}
	await fs.writeFile(notesPath, JSON.stringify(notesDB))
	console.log(chalk.blue.inverse(`Note by id: ${id} updated!`))
}

module.exports = {
	addNotes,
	printNotes,
	removeNoteById,
	editNoteById
}