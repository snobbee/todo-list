const chalk = require('chalk');
const mainMenu = require('./src/menu');
const addTodo = require('./src/commands/add');
const viewTodos = require('./src/commands/view');
const markComplete = require('./src/commands/mark-complete');
const deleteTodo = require('./src/commands/delete');

async function main() {
    console.log(chalk.blue('='.repeat(50)));
    console.log(chalk.blue('🚀 Welcome to Todo CLI!'));
    console.log(chalk.blue('='.repeat(50)));
    
    while (true) {
        try {
            const action = await mainMenu();
            
            console.log(chalk.gray('\n' + '-'.repeat(50)));
            
            switch (action) {
                case 'View Todos':
                    await viewTodos();
                    break;
                case 'Add Todo':
                    await addTodo();
                    break;
                case 'Mark Todo as Complete':
                    await markComplete();
                    break;
                case 'Delete Todo':
                    await deleteTodo();
                    break;
                case 'Exit':
                    console.log(chalk.blue('\n👋 Goodbye!'));
                    process.exit(0);
            }
            
            console.log(chalk.gray('\n' + '-'.repeat(50)));
        } catch (error) {
            console.error(chalk.red('\n❌ An error occurred:'));
            console.error(chalk.red(error.message));
            console.error(chalk.gray('\nStack trace:'));
            console.error(chalk.gray(error.stack));
        }
    }
}

console.log(chalk.blue('🔄 Initializing Todo CLI...'));
main().catch(error => {
    console.error(chalk.red('\n💥 Fatal error:'));
    console.error(chalk.red(error.message));
    console.error(chalk.gray('\nStack trace:'));
    console.error(chalk.gray(error.stack));
    process.exit(1);
}); 