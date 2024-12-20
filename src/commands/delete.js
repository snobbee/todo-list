const inquirer = require('inquirer');
const chalk = require('chalk');
const { loadTodos, saveTodos } = require('../utils/storage');

async function deleteTodo() {
    console.log(chalk.blue('\n🗑️  Starting delete process...'));
    
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
            message: 'Select todo to delete:',
            choices: todos
                .filter(todo => todo.text.trim().length > 0)
                .map(todo => ({
                    name: `${todo.completed ? '✓' : '✗'} ${todo.text.trim()}`,
                    value: todo.id
                }))
        }
    ]);

    const todoToDelete = todos.find(todo => todo.id === todoId);
    if (!todoToDelete) {
        console.log(chalk.yellow('⚠️  Todo not found!'));
        return;
    }
    console.log(chalk.yellow(`⚠️  Deleting todo: "${todoToDelete.text}"`));
    
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    await saveTodos(updatedTodos);
    
    console.log(chalk.green('✨ Todo deleted successfully!'));
    console.log(chalk.gray(`📊 Remaining todos: ${updatedTodos.length}`));
}

module.exports = deleteTodo; 