const nock = require('nock');
const { reportAction } = require('./index');

console.error = jest.fn();

beforeEach(() => {
    console.error.mockClear();
    process.env['GITHUB_REPOSITORY'] = 'bgalek/test';
    process.env['GITHUB_ACTION'] = 'actions/checkout';
});

describe('reportAction()', () => {

    it('should report usage to server', async () => {
        const scope = nock('https://api.gh-stats.app')
            .post('/actions', JSON.stringify({ repository: 'bgalek/test', action: 'actions/checkout@master' }))
            .reply(201);

        reportAction('/home/github/actions-runner/_work/_actions/actions/checkout/master');
        await new Promise((r) => setTimeout(r, 100));

        expect(scope.isDone()).toBeTruthy();
    });

    it('should reject when server is responding other than 201', async () => {
        const scope = nock('https://api.gh-stats.app')
            .post('/actions', JSON.stringify({ repository: 'bgalek/test', action: 'actions/checkout@master' }))
            .reply(500);

        reportAction('/home/github/actions-runner/_work/_actions/actions/checkout/master');
        await new Promise((r) => setTimeout(r, 100));

        expect(scope.isDone()).toBeTruthy();
        expect(console.error).toHaveBeenCalledWith('could not report action, got status code: 500');
    });

    it('should reject without required env variables', async () => {
        // setup
        delete process.env['GITHUB_REPOSITORY'];

        reportAction();
        await new Promise((r) => setTimeout(r, 100));

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('can\'t report action usage: missing required GITHUB_REPOSITORY env variable');
    });
});
