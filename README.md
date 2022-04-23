![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bgalek/gh-stats/CI?style=flat-square)
[![npm (scoped)](https://img.shields.io/npm/v/@gh-stats/reporter?style=flat-square)](https://www.npmjs.com/package/@gh-stats/reporter)

# gh-stats reporter package
> free lightweight github actions analytics

## Install

```bash
npm i @gh-stats/reporter
```

## Usage

### Node.js action

Add `reportAction()` call to your action code.
```js
const { reportAction } = require('@gh-stats/reporter');

reportAction();
```

### Run action

Add `reportAction()` call to your action yml.
```bash
bash <(curl -s https://gh-stats.app/actions/bash/v1)
```

> you can always validate our script via SHA-512 sum that we are publishing at [https://api.gh-stats.app/actions/bash/v1.sha512](https://api.gh-stats.app/actions/bash/v1.sha512)

## How does it work?

This library simply reports usage of your workflow and stores it in database.

You can view your action stats at [https://api.gh-stats.app/actions/{user}/{action-repository}](https://api.gh-stats.app/actions/{user}/{action-repository}).

## Badge

After reporting, add a badge to your `README.md` 

```markdown
![example](https://shields.gh-stats.app/badge?action=allegro-actions/verify-monitoring)
```
![example](https://shields.gh-stats.app/badge?action=allegro-actions/verify-monitoring)

You can use any shields.io api query parameters:
```markdown
![example](https://shields.gh-stats.app/badge?action=allegro-actions/verify-monitoring&color=yellow&style=flat)
```
![example](https://shields.gh-stats.app/badge?action=allegro-actions/verify-monitoring&color=yellow&style=social)
