/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js"], // Suporta TypeScript e JavaScript
  testMatch: ["**/tests/**/*.test.(ts|js)"], // Procura arquivos de teste na pasta 'tests'
  clearMocks: true, // Limpa os mocks automaticamente entre os testes
  coverageDirectory: "coverage", // Gera relatório de cobertura de código
  // setupFilesAfterEnv: ["./jest.setup.js"], // Comentado/Removido, a menos que precise de configuração específica
};
