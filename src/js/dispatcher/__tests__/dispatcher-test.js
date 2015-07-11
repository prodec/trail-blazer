jest.dontMock('../dispatcher');

describe('Dispatcher', () => {
  it('handles actions', () => {
    let dispatcher = require('../dispatcher.js');
    dispatcher.dispatch = jest.genMockFunction();
    dispatcher.handleAction('bob');
    expect(dispatcher.dispatch.mock.calls.length).toBe(1);
    expect(dispatcher.dispatch.mock.calls[0][0]).toBe('bob');
  });
});
