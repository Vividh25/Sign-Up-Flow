module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css)$': process.cwd() + '/mock.js',
  },
};
