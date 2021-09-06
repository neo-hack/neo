# inquirer-maxlength-input-prompt
> Input prompt with max length for [inquirer](https://www.npmjs.com/package/inquirer)

> [![tests](https://img.shields.io/travis/jwarby/inquirer-maxlength-input-prompt.svg?label=tests&style=flat)](https://travis-ci.org/jwarby/inquirer-maxlength-input-prompt)
> ![test coverage](https://img.shields.io/coveralls/jwarby/inquirer-maxlength-input-prompt.svg?label=test%20coverage&style=flat)
> [![npm published version](https://img.shields.io/npm/v/inquirer-maxlength-input-prompt.svg?style=flat)](https://www.npmjs.com/package/inquirer-maxlength-input-prompt)
> [![require node version](https://img.shields.io/node/v/inquirer-maxlength-input-prompt.svg?style=flat)](https://nodejs.org/en/download/releases/)
> ![license](https://img.shields.io/github/license/jwarby/inquirer-maxlength-input-prompt.svg?style=flat)

Extends the built-in `input` prompt type to allow a max input length to be
specified, and shows a character counter which updates as the user types.

![inquirer-maxlength-input-prompt](screencast/basic_example.gif)

## Usage

Install using `npm` or `yarn`:

```bash
yarn add inquirer-maxlength-input-prompt
```

Register the prompt with `inquirer`:

```javascript
const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

// The name doesn't have to `maxlength-input` - it can be anything you like
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
```

When you use the prompt, you must provide a `maxLength` option:

```javascript
inquirer.prompt([
  {
    type: 'maxlength-input',
    name: 'title',
    message: 'Enter a title',
    maxLength: 20
  }
]).then(answers => {
  /* ...snip... */
})
```

## Options

In addition to the options that the built-in [`input` type prompt](https://www.npmjs.com/package/inquirer#input---type-input)
takes, this plugin also takes:

- `maxLength` (Number [_required_]): the maximum number of characters the user can enter

The following options behave slightly differently, and are demonstrated in:

- `transformer` (Function): you get the current `answers` hash as an extra
  (second) argument.
- `validate` (Function): for convenience, you get the raw user input as an extra
  (third) argument.  This makes it easy to do checks against raw user input when you
  have a `filter` parameter that adds prefixes/suffixes/otherwise modifies the
  input.
  - the validation against `maxLength` is performed before your own custom
  `validate` function is invoked

These additions are demonstrated in the example "[Adding a prefix](#adding-a-prefix)"
below.

## Examples

### Basic usage

```javascript
const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

inquirer.prompt([
  {
    type: 'maxlength-input',
    name: 'title',
    message: 'Enter a title',
    maxLength: 15
  }
]).then(console.log)
```

### Adding a prefix

This example shows one way to prefix the user's input with a value _and_ pretty
print it during prompting, using the `filter` and `transformer` options
respectively.  In addition, this example also shows how the `raw` parameter that
is passed to the `validate` function can be used - in this case, it is used to
ensure the user still enters data despite the presence of the prefix.

![Advanced example](screencast/advanced_example.gif)

```javascript
const chalk = require('chalk')
const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

inquirer.prompt([
  {
    type: 'list',
    name: 'commitType',
    message: 'What type of change are you committing?',
    choices: ['feature', 'fix', 'docs', 'other']
  },
  {
    type: 'maxlength-input',
    name: 'commitHeader',
    maxLength: 50,
    message: 'Enter the commit subject',
    validate(input, answers, raw) {
      if (!raw) {
        return 'Please enter a subject for your commit'
      }

      return true
    },
    filter(input, answers) {

      // Return prefix + input
      return `${answers.commitType}: ${input}`
    },
    transformer(input, answers) {

      // Pretty print prefix before input to assist user
      return chalk.blue(`${answers.commitType}: `) + input
    }
  }
]).then(console.log)
```
