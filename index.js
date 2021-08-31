const { version } = require('./package.json');
const https = require('https');
const url = 'https://gh-stats.app/actions';

module.exports = {
    /**
     * Reports usage of this GitHub Action.
     *
     * Uses data provided by GitHub Actions runtime:
     * - Repository name (from `GITHUB_REPOSITORY` environment variable)
     * - Action name (from `GITHUB_ACTION` environment variable)
     *
     */
    reportAction: (path = __dirname) => {
        new Promise((resolve, reject) => {
            const repository = process.env['GITHUB_REPOSITORY'];

            if (!repository) {
                reject('can\'t report action usage: missing required GITHUB_REPOSITORY env variable');
                return;
            }

            const action = getActionName(path);

            if (!action) {
                reject('can\'t report action usage: unknown action');
                return;
            }

            const request = https.request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-reporter': `js@${version}` }
            }, response => {
                if (response.statusCode !== 201) {
                    reject(`could not report action, got status code: ${response.statusCode}`);
                }
                response.on('end', resolve);
                response.on('data', resolve);
            });
            request.on('error', reject);
            request.setTimeout(300, reject);
            request.setNoDelay();
            request.write(JSON.stringify({ repository, action }));
            request.end();
        }).catch(console.error);
    }
};

function getActionName(path) {
    if (!path.includes('_actions')) return null;
    const actionPathParts = path.split('_actions', 2);
    if (actionPathParts.length !== 2) return null;
    const actionParts = actionPathParts[1].split('/').filter(it => it !== '');
    if (actionParts.length < 3) return null;
    const user = actionParts.shift();
    const repository = actionParts.shift();
    const actionTag = actionParts.shift();
    return `${user}/${repository}@${actionTag}`;
}
