// Suppress chalk colors in tests
process.env.FORCE_COLOR = 0;

// Mock console.log globally for all tests
global.console = {
    ...console,
    log: jest.fn(),
    error: jest.fn()
}; 