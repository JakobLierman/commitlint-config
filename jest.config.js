/** @type {import('jest').Config} */
module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80
		}
	},
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/'],
};
