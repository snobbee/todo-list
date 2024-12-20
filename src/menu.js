const inquirer = require('inquirer');
const chalk = require('chalk');

async function mainMenu() {
    console.log(chalk.blue('\n📌 Main Menu'));
    
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View Todos',
                'Add Todo',
                'Mark Todo as Complete',
                'Delete Todo',
                'Exit'
            ]
        }
    ]);
    
    console.log(chalk.blue(`🎯 Selected action: ${action}`));
    return action;
}

module.exports = mainMenu; 