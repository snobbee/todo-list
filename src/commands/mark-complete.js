const inquirer = require('inquirer');
const chalk = require('chalk');
const { loadTodos, saveTodos } = require('../utils/storage');

async function markComplete() {
    console.log(chalk.blue('\n✓ Starting mark complete process...'));
    
    const todos = await loadTodos();
    if (todos.length === 0) {
        console.log(chalk.yellow('📭 No todos found!'));
        return;
    }

    console.log(chalk.blue(`📋 Found ${todos.length} todos to choose from`));
    
    const { todoId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'todoId',
            message: 'Select todo to mark as complete:',
            choices: todos.map(todo => ({
                name: `${todo.completed ? '✓' : '✗'} ${todo.text}`,
                value: todo.id
            }))
        }
    ]);

    console.log(chalk.blue('⏳ Updating todo status...'));
    
    const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
            console.log(chalk.blue(`🎯 Marking "${todo.text}" as complete`));
            return { ...todo, completed: true };
        }
        return todo;
    });
    
    await saveTodos(updatedTodos);
    console.log(chalk.green('✨ Todo marked as complete successfully!'));
}

module.exports = markComplete; 