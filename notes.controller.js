const fs = require("fs/promises")
const path = require("path")

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
}

async function getNotes() {
	const notesDB = await fs.readFile(notesPath, { encoding: "utf-8" })
	return Array.isArray(JSON.parse(notesDB)) ? JSON.parse(notesDB) : []
}

module.exports = {
	addNotes,
	getNotes
}