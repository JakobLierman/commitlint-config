const { describe, beforeAll, test, expect} = require('@jest/globals');
const load = require('@commitlint/load').default;
const lint = require('@commitlint/lint').default;

describe('Commitlint Configuration', () => {
	/**
	 * Load commitlint configuration from index.js
	 * @type {import('@commitlint/types').QualifiedConfig}
	 */
	let commitlintConfig;

	beforeAll(async () => {
		commitlintConfig = await load({}, { cwd: process.cwd(), file: 'commitlint.config.js' });
	});

	test('Should load commitlint config without errors', async () => {
		expect(commitlintConfig).toBeDefined();
		expect(commitlintConfig).toHaveProperty('extends');
		expect(commitlintConfig.extends).toBeDefined();
		expect(commitlintConfig).toHaveProperty('rules');
		expect(commitlintConfig.rules).toBeDefined();
	});

	test('Should pass linting with valid feat commit message', async () => {
		const result = await lint('feat: add new feature', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with valid fix commit message', async () => {
		const result = await lint('fix: resolve a bug', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with valid chore commit message', async () => {
		const result = await lint('chore: update dependencies', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should fail linting with missing type in commit message', async () => {
		const result = await lint('missing type', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', false);
	});

	test('Should fail linting with invalid type in commit message', async () => {
		const result = await lint('invalid-type: fix something', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', false);
	});

	test('Should fail linting with missing colon in commit message', async () => {
		const result = await lint('missing colon', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', false);
	});

	// TODO: Fix this test case
	// test('Should pass linting with breaking change', async () => {
	// 	const result = await lint(
	// 		'feat(api)!: add breaking new feature',
	// 		commitlintConfig.rules,
	// 	);
	// 	expect(result).toHaveProperty('valid', true);
	// });

	test('Should pass linting with breaking change in commit footer', async () => {
		const result = await lint(
			'feat: add amazing new feature\n\nBREAKING CHANGE: it breaks something',
			commitlintConfig.rules,
		);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should fail linting with invalid breaking change format', async () => {
		const result = await lint('feat!(scope): add new feature', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', false);
	});

	test('Should pass linting with multiple lines', async () => {
		const result = await lint(
			'feat: add new feature\nMore detailed description',
			commitlintConfig.rules,
		);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with valid test commit message', async () => {
		const result = await lint('test: add unit tests', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with valid docs commit message', async () => {
		const result = await lint('docs: update documentation', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with valid style commit message', async () => {
		const result = await lint('style: fix code style issues', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with valid refactor commit message', async () => {
		const result = await lint('refactor: refactor code', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	test('Should pass linting with multi-paragraph body and multiple footers', async () => {
		const result = await lint('fix: prevent racing of requests\n' +
			'\n' +
			'Introduce a request id and a reference to latest request. Dismiss\n' +
			'incoming responses other than from latest request.\n' +
			'\n' +
			'Remove timeouts which were used to mitigate the racing issue but are\n' +
			'obsolete now.\n' +
			'\n' +
			'Reviewed-by: Z\n' +
			'Refs: #123', commitlintConfig.rules);
		expect(result).toHaveProperty('valid', true);
	});

	// Add more test cases for different scenarios and commit message variations
});
