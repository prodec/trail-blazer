import $ from 'jquery';
import React from 'react/addons';
const { addons: { TestUtils } } = React;

['goTo', 'tab', 'form'].forEach(path => {
  jest.dontMock(`../goTo/${path}`);
});
jest.dontMock('isomorphic-fetch');

describe('GoTo', () => {
  let GoTo = require('../goTo/goTo');

  it('changes form on tab click', () => {
    let goTo = TestUtils.renderIntoDocument(<GoTo />);
    let [geoTab, utmTab] = getTabs(goTo);

    expect(getFirstInputName(goTo)).toBe('lat');
    TestUtils.Simulate.click(utmTab);
    expect(getFirstInputName(goTo)).toBe('north');
    TestUtils.Simulate.click(geoTab);
    expect(getFirstInputName(goTo)).toBe('lat');
  });

  describe('triggers goToCoordinate action', () => {
    let Actions = require('../../actions/actions');
    let Form = require('../goTo/form');
    let goTo;
    let formTag;
    let formObject;

    beforeEach(() => {
      goTo = TestUtils.renderIntoDocument(<GoTo />);
    });

    afterEach(() => {
      Actions.goToCoordinate.mockClear();
    });

    it('on geo form submit', () => {
      formTag = getForm(goTo);
      formObject = TestUtils.findRenderedComponentWithType(goTo, Form);
      formObject.getlatlng = jest.genMockFunction();
      TestUtils.Simulate.submit(formTag);
      expect(Actions.goToCoordinate.mock.calls.length).toBe(1);
    });

    it('on utm form submit', () => {
      let utmTab = getTabs(goTo)[1];

      TestUtils.Simulate.click(utmTab);
      formTag = getForm(goTo);
      formObject = TestUtils.findRenderedComponentWithType(goTo, Form);
      formObject.getLatLng = jest.genMockFunction();

      TestUtils.Simulate.submit(formTag);
      expect(Actions.goToCoordinate.mock.calls.length).toBe(1);
    });
  });

  let getTabs = (component) => {
    let tabs = Object.keys(require.requireActual('../../constants/constants').GoToTabConstants);

    return tabs.sort().map(key => {
      return React.findDOMNode(component.refs[key]);
    });
  };

  let getForm = (component) => {
    return React.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(component, 'form'));
  };

  let getFirstInputName = (component) => {
    let form = getForm(component);

    return $(form).find('input').first().attr('name');
  };
});
