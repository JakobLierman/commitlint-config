# Personal Commitlint Configuration

[//]: # (Badges)
[![Commitlint Config](https://img.shields.io/badge/commitlint-config-blue.svg)](https://www.npmjs.com/package/@JakobLierman/commitlint-config)
[![Test](https://github.com/JakobLierman/commitlint-config/actions/workflows/test.yml/badge.svg)](https://github.com/JakobLierman/commitlint-config/actions/workflows/test.yml)

This package provides a custom [commitlint](https://commitlint.js.org/#/) configuration to ensure consistent and meaningful commit messages in your projects.

## Installation

Install the package using your package manager of choice:

```bash
npm install --save-dev @JakobLierman/commitlint-config
```

```bash
yarn add --dev @JakobLierman/commitlint-config
```

```bash
pnpm add --save-dev @JakobLierman/commitlint-config
```

## Usage

To use this configuration, add the following to your `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@JakobLierman'],
  // Add additional rules or overrides if needed
};
```

Now, commitlint will use the rules defined in this package to validate your commit messages.

## Rules

This configuration extends the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) configuration.

At this time, no additional rules are defined.

Feel free to customize the configuration by extending or overriding rules to suit your project's needs.

## Example

Here's an example of a commit message that adheres to this configuration:

```
feat(api): add new endpoint for user authentication
```
