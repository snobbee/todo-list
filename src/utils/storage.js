const fs = require('fs').promises;
const chalk = require('chalk');

const TODO_FILE = 'todos.json';

async function loadTodos() {
    console.log(chalk.blue('📂 Attempting to load todos from file...'));
    try {
        const data = await fs.readFile(TODO_FILE, 'utf8');
        const todos = JSON.parse(data);
        console.log(chalk.green(`✅ Successfully loaded ${todos.length} todos from file`));
        return todos;
    } catch (error) {
        console.log(chalk.yellow('⚠️  No existing todos file found, starting with empty list'));
        return [];
    }
}

async function saveTodos(todos) {
    console.log(chalk.blue('💾 Saving todos to file...'));
    await fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));
    console.log(chalk.green(`✅ Successfully saved ${todos.length} todos to file`));
}

module.exports = {
    loadTodos,
    saveTodos
}; 