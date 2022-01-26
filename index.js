const yargs = require("yargs")
const pkg = require("./package.json")
const { addNotes, getNotes } = require("./notes.controller")

yargs.version(pkg.version)

console.log(process.argv) // Массив со всеми аргументами, которые мы передаем в консоли

yargs.command({
	command: "add",
	describe: "add new note to list",
	builder: {
		title: {
			type: "string",
			describe: "note title",
			demandOption: true
		},
		tag: {
			type: "string",
			describe: "some tag",
			demandOption: true
		}
	},
	handler(options) { // Обработка консольного параметра "node index add"
		addNotes(options.title, options.tag)
	}
})

yargs.command({
	command: "list",
	describe: "Print all notes",
	async handler() {
		const notes = await getNotes()
		console.log("All notes: ", notes)
	}
})

yargs.parse()