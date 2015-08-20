jest.autoMockOff(); // error on auto mocking isomorphic-fetch and qs

describe('WindApi', () => {
  let WindApi;

  beforeEach(() => {
    WindApi = require('../windApi');
  });

  it('gets windSpeed', () => {
    let speed = 99;
    WindApi.prototype.getWeather = () => { return { then: (fn) => {
      return fn({ currently: { windSpeed: speed } });
    } } };

    expect(new WindApi().getWindSpeed()).toBe(speed);
  });

  function mockLibs(query) {
    require('isomorphic-fetch');
    let Qs = require('qs');
    fetch = jest.genMockFunction().mockReturnValue({ then: () => {} });
    Qs.stringify = jest.genMockFunction().mockReturnValue(query);
  }
});
