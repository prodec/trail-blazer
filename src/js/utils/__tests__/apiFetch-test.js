jest.autoMockOff(); // error on auto mocking isomorphic-fetch and qs

describe('ApiFetch', () => {
  let ApiFetch;
  let options;

  beforeEach(() => {
    ApiFetch = require('../apiFetch');
    options = {
      url: 'path/',
      query: { q: '1' }
    }
    window.ServerConstants = {};
  });

  it('fetches and calls parser', () => {
    let mockFn = mockFetch();
    options.responseParser = () => { 'sou um callback feliz' };

    new ApiFetch(options).run()
    expect(mockFn).toBeCalledWith(options.responseParser);
  });

  it('setups query when method is get/head', () => {
    let apiFetch = new ApiFetch(options);

    expect(apiFetch.url).not.toEqual(options.url);
    expect(apiFetch.init.body).toBe(undefined);
  });

  it('setups query when method is not get/head', () => {
    options.method = 'post';
    let apiFetch = new ApiFetch(options);

    expect(apiFetch.url).toEqual(options.url);
    expect(apiFetch.init.body).not.toBe(undefined);
  });

  function mockFetch() {
    require('isomorphic-fetch');
    let mockFn = jest.genMockFunction();
    fetch = jest.genMockFunction().mockReturnValue({ then: () => {
      return { then: mockFn };
    } });

    return mockFn;
  }
});
