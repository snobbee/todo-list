export const prioritizeTasks = (tasks) => {
    return tasks.sort((a, b) => b.priority - a.priority);
};