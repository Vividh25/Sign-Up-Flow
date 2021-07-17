module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css)$': process.cwd() + '/mock.js',
  },
  setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
  setupFiles: ['enzyme-react-16-adapter-setup'],
};
