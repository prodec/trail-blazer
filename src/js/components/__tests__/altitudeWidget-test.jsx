import React from 'react/addons';
const { addons: { TestUtils } } = React;

jest
  .dontMock('../widgets/altitudeWidget');

describe('AltitudeWidget', () => {
  let AltitudeWidget = require('../widgets/altitudeWidget');
  let store = require('../../stores/altitudeStore');
  let widget;
  const altitude = 456;
  const modifiedAltitude = 999;

  beforeEach(() => {
    store.getState.mockReturnValue({ altitude });
    widget = TestUtils.renderIntoDocument(<AltitudeWidget />);
  });

  it('initialize altitude widget', () => {
    expect(widget.state.altitude).toBe(altitude);
  });

  it('update widget based on store value', () => {
    expect(store.addChangeListener).toBeCalledWith(widget.setAltitude);
  });

  it('widget set value', () => {
    store.getState.mockReturnValue({ altitude: modifiedAltitude });
    widget.setAltitude();
    expect(widget.state.altitude).toEqual(modifiedAltitude);
  });
});
