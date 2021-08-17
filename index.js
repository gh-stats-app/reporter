const https = require('https');
const url = 'https://gh-stats.app/actions';

module.exports = {
    reportAction: () => {
        return new Promise((resolve, reject) => {
            const repository = process.env['GITHUB_REPOSITORY'];
            const action = process.env['GITHUB_ACTION'];
            
            if ([repository, action].some(it => !it)) {
                reject('can\'t report action usage: missing required env variables');
                return;
            }

            const request = https.request(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, response => {
                if (response.statusCode !== 201) {
                    reject(`could not report action, got status code: ${response.statusCode}`);
                }
                response.on('end', resolve);
                response.on('data', resolve);
            });
            request.on('error', reject);
            request.write(JSON.stringify({ repository, action }));
            request.end();
        }).catch(console.error);
    }
};
