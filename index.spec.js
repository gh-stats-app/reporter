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
        const scope = nock('https://gh-stats.app')
            .post('/actions', JSON.stringify({ repository: 'bgalek/test', action: 'actions/checkout' }))
            .reply(201);

        await reportAction();

        expect(scope.isDone());
    });

    it('should reject when server is responding other than 201', async () => {
        nock('https://gh-stats.app')
            .post('/actions', JSON.stringify({ repository: 'bgalek/test', action: 'actions/checkout' }))
            .reply(500);

        await reportAction();

        expect(console.error).toHaveBeenCalledTimes(1);
    });

    it('should reject without required env variables', async () => {
        // setup
        delete process.env['GITHUB_REPOSITORY'];
        delete process.env['GITHUB_ACTION'];

        await reportAction();

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith('can\'t report action usage: missing required env variables');
    });
});
