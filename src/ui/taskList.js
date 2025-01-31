import { prioritizeTasks } from '../taskPrioritization';

const renderTasks = (tasks) => {
    const prioritizedTasks = prioritizeTasks(tasks);
    prioritizedTasks.forEach(task => {
        console.log(`Task: ${task.name}, Priority: ${task.priority}`);
    });
};