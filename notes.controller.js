const fs = require("fs/promises")

async function addNotes(title, tag) {
	const notesDB = require("./db.json") // Импровизированная БД
	const note = {
		title,
		tag,
		id: Date.now().toString()
	}
	notesDB.push(note)

	await fs.writeFile("./db.json", JSON.stringify(notesDB))
}

function getNotes() {
	return require("./db.json")
}

module.exports = {
	addNotes,
	getNotes
}