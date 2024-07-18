module.exports = {
  transform: {
      '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['./jest.setup.js'],
};