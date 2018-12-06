jest.mock('fs', () => ({
    readFileSync: jest.fn()
}));

jest.mock('readline-sync', () => ({
    question: jest.fn()
}));