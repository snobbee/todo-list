const chalk = require('chalk');
const { loadTodos } = require('../utils/storage');

async function viewTodos() {
    console.log(chalk.blue('\n📋 Loading todos for viewing...'));
    
    const todos = await loadTodos();
    if (todos.length === 0) {
        console.log(chalk.yellow('📭 No todos found!'));
        return;
    }

    console.log(chalk.blue(`\n📊 Found ${todos.length} todos:`));
    console.log(chalk.gray('─'.repeat(40)));
    
    todos.forEach(todo => {
        const status = todo.completed ? chalk.green('✓') : chalk.red('✗');
        const date = new Date(todo.id).toLocaleString();
        console.log(`${status} ${todo.text}`);
        console.log(chalk.gray(`   Created: ${date}`));
        console.log(chalk.gray('─'.repeat(40)));
    });
}

module.exports = viewTodos; 