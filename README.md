# Todo CLI Application

A command-line interface (CLI) application for managing your todos, built with Node.js.

CHANGED

## Features

- 📝 Add new todos
- 👀 View all todos with creation timestamps
- ✅ Mark todos as complete
- 🗑️ Delete todos
- 💾 Persistent storage using JSON file
- 🎨 Colorful and intuitive interface

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-cli
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

## Testing

To run the tests:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

The test suite includes:

- End-to-end testing of all main features
- Error handling scenarios
- File system operations
- User input validation

### Continuous Integration

This project uses GitHub Actions for continuous integration. The CI pipeline:

- Runs on Ubuntu latest
- Tests against Node.js versions 16.x, 18.x, and 20.x
- Runs the full test suite
- Generates and uploads test coverage reports
- Runs on every push to main and pull requests

Status: ![CI](https://github.com/<username>/todo-cli/workflows/CI/badge.svg)

## Usage

The application provides an interactive menu with the following options:

### View Todos

- Displays all todos with their completion status
- Shows creation timestamp for each todo
- ✓ indicates completed todos
- ✗ indicates pending todos

### Add Todo

- Enter the text for your new todo
- Todo is automatically saved with:
  - Unique ID (timestamp-based)
  - Creation time
  - Initial status: incomplete

### Mark Todo as Complete

- Select a todo from the list
- Automatically marks it as complete
- Updates the storage file

### Delete Todo

- Select a todo to remove
- Permanently removes it from storage
- Shows confirmation message

### Exit

- Safely exits the application

## File Structure

```
todo-cli/
├── src/
│   ├── commands/
│   │   ├── add.js       # Add todo functionality
│   │   ├── delete.js    # Delete todo functionality
│   │   ├── mark-complete.js # Mark todo as complete
│   │   └── view.js      # View todos functionality
│   ├── utils/
│   │   └── storage.js   # File storage operations
│   └── menu.js          # Main menu interface
├── index.js             # Application entry point
├── package.json         # Project configuration
└── todos.json          # Todo storage file
```

## Data Storage

Todos are stored in `todos.json` with the following structure:

```json
[
  {
    "id": 1678901234567,
    "text": "Example todo",
    "completed": false
  }
]
```

## Dependencies

- `inquirer` (v8.2.4): Interactive command line interface
- `chalk` (v4.1.2): Terminal string styling

## Error Handling

The application includes comprehensive error handling:

- File system errors
- Invalid JSON data
- User input validation
- Graceful error messages with stack traces in development

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Troubleshooting

### Common Issues

1. **Installation Errors**

   ```bash
   npm cache clean --force
   npm install
   ```

2. **File Permission Issues**

   ```bash
   chmod +x index.js
   ```

3. **Storage File Issues**
   - Ensure write permissions in the directory
   - Check if todos.json is not corrupted

### Debug Mode

For detailed logging, run the application with:

```bash
DEBUG=true npm start
```

## Support

For support, please open an issue in the repository or contact the maintainers.
