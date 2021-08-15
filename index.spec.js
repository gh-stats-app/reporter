const nock = require('nock');
const { reportAction } = require('./index');

process.env['GITHUB_REPOSITORY'] = 'bgalek/test';
process.env['GITHUB_ACTION'] = 'actions/checkout';

console.error = jest.fn();

beforeEach(() => {
    console.error.mockClear();
});

describe('reportAction()', () => {

    it('should report usage to server', () => {
        nock('https://gh-stats.app')
            .post('/actions', JSON.stringify({ repository: 'bgalek/test', action: 'actions/checkout' }))
            .reply(201);

        return expect(reportAction()).resolves.toBeUndefined();
    });

    it('should reject when server is responding other than 201', async () => {
        nock('https://gh-stats.app')
            .post('/actions', JSON.stringify({ repository: 'bgalek/test', action: 'actions/checkout' }))
            .reply(500);
        await reportAction();
        return expect(console.error).toHaveBeenCalledTimes(1);
    });
});