const yargs = require("yargs")
const pkg = require("./package.json")
const { addNotes, printNotes, removeNoteById } = require("./notes.controller")

yargs.version(pkg.version)

console.log(process.argv) // Массив со всеми аргументами, которые мы передаем в консоли

yargs.command({
	command: "add",
	describe: "Add new note to list",
	builder: {
		title: {
			type: "string",
			describe: "Note title",
			demandOption: true
		},
		tag: {
			type: "string",
			describe: "Some tag",
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
	handler() {
		printNotes()
	}
})

yargs.command({
	command: "remove",
	describe: "Remove note by ID",
	builder: {
		id: {
			type: "string",
			describe: "Some id note",
			demandOption: true
		}
	},
	handler(options) {
		removeNoteById(options.id)
	}
})

yargs.parse()