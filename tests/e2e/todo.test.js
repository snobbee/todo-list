const fs = require('fs').promises;
const mockFs = require('mock-fs');
const stripAnsi = require('strip-ansi');
const { loadTodos, saveTodos } = require('../../src/utils/storage');
const addTodo = require('../../src/commands/add');
const viewTodos = require('../../src/commands/view');
const markComplete = require('../../src/commands/mark-complete');
const deleteTodo = require('../../src/commands/delete');
const mainMenu = require('../../src/menu');

// Mock inquirer
jest.mock('inquirer', () => ({
    prompt: jest.fn()
}));
const inquirer = require('inquirer');

// Mock console.log to capture output
let consoleOutput = [];
const mockConsoleLog = output => consoleOutput.push(stripAnsi(output));
beforeEach(() => {
    consoleOutput = [];
    console.log = mockConsoleLog;
});

describe('Todo CLI E2E Tests', () => {
    beforeEach(() => {
        // Mock file system
        mockFs({
            'todos.json': '[]'
        });
    });

    afterEach(() => {
        mockFs.restore();
        jest.clearAllMocks();
    });

    describe('Main Menu', () => {
        it('should handle menu selection correctly', async () => {
            inquirer.prompt.mockResolvedValueOnce({ action: 'View Todos' });
            const result = await mainMenu();
            expect(result).toBe('View Todos');
            expect(consoleOutput.some(line => line.includes('Selected action: View Todos'))).toBe(true);
        });
    });

    describe('Add Todo', () => {
        it('should add a new todo successfully', async () => {
            inquirer.prompt.mockResolvedValueOnce({ todo: 'Test todo item' });
            await addTodo();
            const todos = await loadTodos();
            expect(todos).toHaveLength(1);
            expect(todos[0].text).toBe('Test todo item');
            expect(todos[0].completed).toBe(false);
            expect(consoleOutput).toContain('✨ Todo added successfully!');
        });

        it('should handle empty todo input', async () => {
            inquirer.prompt.mockResolvedValueOnce({ todo: '' });
            await addTodo();
            const todos = await loadTodos();
            expect(todos).toHaveLength(0);
        });

        it('should handle whitespace-only todo input', async () => {
            inquirer.prompt.mockResolvedValueOnce({ todo: '   ' });
            await addTodo();
            const todos = await loadTodos();
            expect(todos).toHaveLength(0);
        });

        it('should handle very long todo input', async () => {
            const longText = 'a'.repeat(1000);
            inquirer.prompt.mockResolvedValueOnce({ todo: longText });
            await addTodo();
            const todos = await loadTodos();
            expect(todos[0].text).toBe(longText);
        });
    });

    describe('View Todos', () => {
        it('should display message when no todos exist', async () => {
            await viewTodos();
            expect(consoleOutput).toContain('📭 No todos found!');
        });

        it('should display existing todos', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Test todo',
                completed: false
            };
            await saveTodos([testTodo]);
            await viewTodos();
            expect(consoleOutput.some(line => line.includes('Test todo'))).toBe(true);
        });

        it('should display completed todos with check mark', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Completed todo',
                completed: true
            };
            await saveTodos([testTodo]);
            await viewTodos();
            expect(consoleOutput.some(line => line.includes('✓'))).toBe(true);
        });
    });

    describe('Mark Complete', () => {
        it('should mark a todo as complete', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Test todo',
                completed: false
            };
            await saveTodos([testTodo]);
            inquirer.prompt.mockResolvedValueOnce({ todoId: testTodo.id });
            await markComplete();
            const todos = await loadTodos();
            expect(todos[0].completed).toBe(true);
            expect(consoleOutput).toContain('✨ Todo marked as complete successfully!');
        });

        it('should handle already completed todos', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Already completed',
                completed: true
            };
            await saveTodos([testTodo]);
            inquirer.prompt.mockResolvedValueOnce({ todoId: testTodo.id });
            await markComplete();
            const todos = await loadTodos();
            expect(todos[0].completed).toBe(true);
        });

        it('should handle non-existent todo IDs', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Test todo',
                completed: false
            };
            await saveTodos([testTodo]);
            inquirer.prompt.mockResolvedValueOnce({ todoId: 999999 });
            await markComplete();
            const todos = await loadTodos();
            expect(todos[0].completed).toBe(false);
        });

        it('should handle empty todo list when marking complete', async () => {
            await markComplete();
            expect(consoleOutput).toContain('📭 No todos found!');
        });

        it('should handle multiple todos when marking complete', async () => {
            const todos = [
                { id: 1, text: 'First todo', completed: false },
                { id: 2, text: 'Second todo', completed: false }
            ];
            await saveTodos(todos);
            inquirer.prompt.mockResolvedValueOnce({ todoId: 1 });
            await markComplete();
            const updatedTodos = await loadTodos();
            expect(updatedTodos[0].completed).toBe(true);
            expect(updatedTodos[1].completed).toBe(false);
        });
    });

    describe('Delete Todo', () => {
        it('should delete a todo', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Test todo',
                completed: false
            };
            await saveTodos([testTodo]);
            inquirer.prompt.mockResolvedValueOnce({ todoId: testTodo.id });
            await deleteTodo();
            const todos = await loadTodos();
            expect(todos).toHaveLength(0);
            expect(consoleOutput).toContain('✨ Todo deleted successfully!');
        });

        it('should handle deletion of non-existent todos', async () => {
            const testTodo = {
                id: Date.now(),
                text: 'Test todo',
                completed: false
            };
            await saveTodos([testTodo]);
            inquirer.prompt.mockResolvedValueOnce({ todoId: 999999 });
            await deleteTodo();
            const todos = await loadTodos();
            expect(todos).toHaveLength(1);
        });

        it('should handle empty todo list when deleting', async () => {
            await deleteTodo();
            expect(consoleOutput).toContain('📭 No todos found!');
        });

        it('should handle multiple todos when deleting', async () => {
            const todos = [
                { id: 1, text: 'First todo', completed: false },
                { id: 2, text: 'Second todo', completed: false }
            ];
            await saveTodos(todos);
            inquirer.prompt.mockResolvedValueOnce({ todoId: 1 });
            await deleteTodo();
            const remainingTodos = await loadTodos();
            expect(remainingTodos).toHaveLength(1);
            expect(remainingTodos[0].id).toBe(2);
        });
    });

    describe('Error Handling', () => {
        it('should handle file system errors gracefully', async () => {
            mockFs({
                'todos.json': mockFs.file({
                    mode: 0o000
                })
            });
            await viewTodos();
            expect(consoleOutput).toContain('📭 No todos found!');
        });

        it('should handle invalid JSON data', async () => {
            await fs.writeFile('todos.json', 'invalid json');
            await viewTodos();
            expect(consoleOutput).toContain('📭 No todos found!');
        });

        it('should handle file write errors', async () => {
            mockFs({
                'todos.json': mockFs.file({
                    mode: 0o444 // read-only
                })
            });
            const testTodo = {
                id: Date.now(),
                text: 'Test todo',
                completed: false
            };
            await expect(saveTodos([testTodo])).rejects.toThrow();
        });

        it('should handle file system quota exceeded', async () => {
            const mockError = new Error('Quota exceeded');
            mockError.code = 'ENOSPC';
            jest.spyOn(fs, 'writeFile').mockRejectedValueOnce(mockError);
            
            const testTodo = { id: 1, text: 'Test todo', completed: false };
            await expect(saveTodos([testTodo])).rejects.toThrow('Quota exceeded');
        });

        it('should handle file system busy errors', async () => {
            const mockError = new Error('Resource busy');
            mockError.code = 'EBUSY';
            jest.spyOn(fs, 'readFile').mockRejectedValueOnce(mockError);
            
            const todos = await loadTodos();
            expect(todos).toEqual([]);
        });
    });

    describe('Storage Operations', () => {
        it('should create todos.json if it does not exist', async () => {
            mockFs({}); // Empty file system
            const todos = await loadTodos();
            expect(todos).toEqual([]);
        });

        it('should handle corrupted todos.json', async () => {
            await fs.writeFile('todos.json', '{corrupted:json[');
            const todos = await loadTodos();
            expect(todos).toEqual([]);
        });

        it('should handle write permission errors when saving todos', async () => {
            mockFs({
                'todos.json': mockFs.file({
                    mode: 0o444, // read-only
                    content: '[]'
                })
            });
            
            const testTodo = { id: 1, text: 'Test todo', completed: false };
            await expect(saveTodos([testTodo])).rejects.toThrow();
        });

        it('should handle read permission errors when loading todos', async () => {
            mockFs({
                'todos.json': mockFs.file({
                    mode: 0o000, // no permissions
                    content: '[]'
                })
            });
            
            const todos = await loadTodos();
            expect(todos).toEqual([]);
        });

        it('should handle directory creation if parent directory missing', async () => {
            mockFs({});
            const todos = [{ id: 1, text: 'Test todo', completed: false }];
            await saveTodos(todos);
            const savedTodos = await loadTodos();
            expect(savedTodos).toEqual(todos);
        });
    });
}); 