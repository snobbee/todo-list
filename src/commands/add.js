const inquirer = require('inquirer');
const chalk = require('chalk');
const { loadTodos, saveTodos } = require('../utils/storage');

async function addTodo() {
    console.log(chalk.blue('\n📝 Starting add todo process...'));

    const { todo } = await inquirer.prompt([
        {
            type: 'input',
            name: 'todo',
            message: 'Enter your todo:'
        }
    ]);

    // Add validation for empty or whitespace-only todos
    if (!todo || !todo.trim()) {
        console.log(chalk.yellow('⚠️  Cannot add empty todo!'));
        return;
    }

    console.log(chalk.blue('⏳ Loading existing todos...'));
    const todos = await loadTodos();

    const newTodo = {
        id: Date.now(),
        text: todo,
        completed: false
    };
    console.log(chalk.blue('➕ Adding new todo:', newTodo.text));
    
    todos.push(newTodo);
    await saveTodos(todos);
    console.log(chalk.green('✨ Todo added successfully!'));
    console.log(chalk.gray(`📊 Current todo count: ${todos.length}`));
}

module.exports = addTodo; 