import { configDefaults, defineConfig } from 'vitest/config';
import GithubActionsInlineReporter from 'vitest-github-actions-reporter';
import { GithubActionsReporter } from 'vitest-github-actions-summary-reporter';

export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS
      ? [
          'default',
          new GithubActionsReporter(),
          new GithubActionsInlineReporter(),
        ]
      : 'default',
    exclude: [...configDefaults.exclude, '**/e2e/**'],
    env: {
      NODE_ENV: 'test',
    },
    coverage: {
      enabled: true,
      reporter: ['json-summary', 'json'],
      reportOnFailure: true,
      // 60% considered acceptable, 75% commendable, and 90% exemplary
      // @see https://testing.googleblog.com/2020/08/code-coverage-best-practices.html
      thresholds: {
        // TODO: Enable thresholds
        // lines: 75,
        // branches: 75,
        // functions: 75,
        // statements: 75,
        autoUpdate: process.env.CI !== 'true',
      },
    },
  },
});
